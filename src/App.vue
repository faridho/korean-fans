<template>
  <v-app id="app">
    <Header />
    <router-view/>
  </v-app>
</template>
<script>
import '@/assets/main.scss'
import Header from '@/components/TheHeader'

export default {
  data: () => ({

  }),

  components: {
    Header
  }
}
</script>
