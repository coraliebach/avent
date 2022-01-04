<template>
  <v-app dark>
    <v-spacer></v-spacer>
    <v-main>
      <v-container>
        <transition appear>
          <vue-snow v-show="isConnected" />
        </transition>
        <v-row justify="center" align="center">
          <v-col cols="10" sm="7" md="5">
            <vue-tree />
          </v-col>
          <v-col cols="12" sm="10" md="7" justify="center">
            <Nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import VueTree from '~/components/VueTree'
import VueSnow from '~/components/VueSnow'

export default {
  components: {
    VueSnow,
    VueTree,
  },
  data () {
    return {
      title: 'Calendrier de l\'avent'
    }
  },
  computed: {
    isConnected() {
      return !!this.$store.state.user
    },
  }
}
</script>
