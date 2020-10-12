SET_HEADER_BLOCK=`cat << 'EOF'
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header Cookie $http_cookie;
EOF`

RATE_LIMITING=`cat << 'EOF'
limit_req_zone $binary_remote_addr zone=zone1:10m rate=2r/s;
limit_req_zone $binary_remote_addr zone=zone2:10m rate=4r/s;
limit_req_zone $binary_remote_addr zone=zone3:10m rate=8r/s;
EOF`

TEMPLATE=`cat << EOF
$RATE_LIMITING

server {
  listen 443 ssl;
  server_name  alpha.omo.earth;
  ssl_certificate /tls/fullchain1.pem;
  ssl_certificate_key /tls/privkey1.pem;

  location /${PROXY_SERVICE_AUTH_PATH} {
    limit_req zone=zone1 burst=6 nodelay;
$SET_HEADER_BLOCK
    proxy_pass ${AUTH_PROTOCOL}${AUTH_DOMAIN}:${AUTH_PORT};
  }

  location /${PROXY_SERVICE_IDENTITY_PATH} {
    limit_req zone=zone2 burst=16 nodelay;
$SET_HEADER_BLOCK
    proxy_pass ${IDENTITY_PROTOCOL}${IDENTITY_DOMAIN}:${IDENTITY_PORT};
  }
}
EOF`
echo "$TEMPLATE" > default.conf
