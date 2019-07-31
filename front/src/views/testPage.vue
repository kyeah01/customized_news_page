<template>
<div>
  {{ this.$store.state.userInfo }}
</div>
</template>

<script>
import NavbarAvatar from './../components/NavbarAvatar'

  export default {
    components: {
      NavbarAvatar
    },
    data () {
      return {
      }
    },
    created () { 
    },
    computed: {
    },
  }
  </script>