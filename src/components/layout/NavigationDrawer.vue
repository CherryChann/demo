<template>
  <div>
    <v-toolbar color="blue darken-1" dark app clipped-left fixed>
      <v-toolbar-title :style="$vuetify.breakpoint.smAndUp ? 'width: 300px; min-width: 250px' : 'min-width: 72px'" class="ml-0 pl-3">
        <span class="hidden-xs-only">Chatbot Web Demo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
  </div>
</template>
<script>
export default {
  name: 'Sidebar',
  data: () => ({
    dialog: false,
    drawer: null,
    isLoggedIn: false
  }),
  methods: {
  },
  computed: {
  }
}
</script>
