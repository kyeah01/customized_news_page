<template>
<div>
      <v-btn
        block
        color="primary"
        dark
        @click="snackbar = true"
      >
        Show Snackbar
      </v-btn>

    <v-snackbar
      v-model="snackbar"
      :bottom="y === 'bottom'"
      :right="x === 'right'"
      :timeout="timeout"
    >
      {{ text }}
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
</div>
</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        y: 'bottom',
        x: 'right',
        timeout: 3000,
        text: 'Success Modify'
      }
    }
  }
  </script>