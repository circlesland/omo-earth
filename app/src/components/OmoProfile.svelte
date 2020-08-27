<script>
  import {users} from "../stores/users";

  export let data = {};
  let profileData = {};
  $: {
    profileData = users.byId(data.id);
  }
</script>

{JSON.stringify(profileData)}
