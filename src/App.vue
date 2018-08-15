<template>
  <v-app light id="app">
    <nav-drawer></nav-drawer>
    <v-content>
      <v-container grid-list-md>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavDrawer from './components/layout/NavigationDrawer.vue'
export default {
  name: 'App',
  components: {
    'nav-drawer': NavDrawer
  },
  data () {
    return {
      isLoggedIn: false
    }
  },
  updated () {
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 20px;
}
.content {
  padding-top: 15px !important;
}
</style>
