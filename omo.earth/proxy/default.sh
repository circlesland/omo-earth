SET_HEADER_BLOCK=`cat << 'EOF'
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Host $http_host;
    proxy_set_header Cookie $http_cookie;
EOF`

TEMPLATE=`cat << EOF
server {
  server_name ${PROXY_EXTERN_DOMAIN};

  listen ${PROXY_PORT};

  location /${PROXY_SERVICE_STATIC_PATH} {
$SET_HEADER_BLOCK
    proxy_pass ${STATIC_PROTOCOL}${STATIC_DOMAIN}:${STATIC_PORT};
  }

  location /${PROXY_SERVICE_AUTH_PATH} {
$SET_HEADER_BLOCK
    proxy_pass ${AUTH_PROTOCOL}${AUTH_DOMAIN}:${AUTH_PORT};
  }

  location /${PROXY_SERVICE_IDENTITY_PATH} {
$SET_HEADER_BLOCK
    proxy_pass ${IDENTITY_PROTOCOL}${IDENTITY_DOMAIN}:${IDENTITY_PORT};
  }

  location /${PROXY_SERVICE_APP_PATH} {
$SET_HEADER_BLOCK
    proxy_pass ${APP_PROTOCOL}${APP_DOMAIN}:${APP_PORT};
  }
}
EOF`
echo "$TEMPLATE" > default.conf
