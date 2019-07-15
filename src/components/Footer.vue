<template>
  <v-footer
    dark
    width="100%"
  >
    <v-card
      flat
      tile
      class="indigo lighten-1 white--text text-xs-center"
    >
      <v-card-text>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-3 white--text"
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>

      <v-card-text class="white--text pt-0">
          {{ weather.one }}, {{ weather.two }}<br>
          the low : {{ weather.temp_min }} °C<br>
          the high : {{ weather.temp_max }} °C
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2018 — <strong>Vuetify</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<script>
  export default {
    data: () => ({
        weather: {
          one:'',
          two:'',
          temp_max:'',
          temp_min:'',
          raw:''
        },
      icons: [
        'fab fa-github',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }),
    created() {
        axios.get('http://api.openweathermap.org/data/2.5/weather?q=daejeon&appid=ab8589d621c1abe7a5d4d62b9bb21c33')
            .then(res => {
              this.weather.raw = res.data
              this.weather.one = res.data.weather[0].main
              this.weather.two = res.data.length>1 ? res.data.weather[1].main : ''
              this.weather.temp_max = res.data.main.temp_max - 273.15
              this.weather.temp_min = res.data.main.temp_min - 273.15
              })
            .catch(error => console.log(error))
    }
  }
</script>