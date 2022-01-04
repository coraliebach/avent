<template>
  <v-row
    :z-index="999">
    <v-col class="text-center">
      <v-card v-if="citation || link" class="mt-4 mb-8">
        <blockquote v-if="citation" class="blockquote">
          <!-- eslint-disable-next-line vue/no-v-html -->
          &#8220;<body v-html="citation"></body>&#8221;
          <footer>
            <small>
              <em>&mdash; Coke.</em>
            </small>
          </footer>
        </blockquote>
        <v-btn v-if="link" :href="link" light class="mb-4">Oh oh oh ! Un lien ! Clique vite !</v-btn>
      </v-card>
      <div class="mb-5">
        <p v-if="isLoading">
          Chargement...
        </p>
        <p v-else-if="!isDecember">
          Eeeh on n'est pas en décembre encore !
        </p>
        <p v-else-if="isChristmasFinished">
          Nooon, noël c'est déjà fini !
        </p>
        <v-img v-else-if="imgSrc" :src="imgSrc" max-width="100%" />
        <p v-else-if="!imgSrc && !link && !citation">
          Oups, une erreur a été rencontrée dans le pôle nord.<br />Veuillez contacter la mère-noël.
        </p>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware({ store, redirect, route }) {
    // If the user is not authenticated
    if (!store.state.user || !store.state.user.daily || typeof route.params.self !== 'string') {
      return redirect('/')
    }
  },
  data() {
    return {
      imgSrc: '',
      citation: '',
      link: '',
      isLoading: true,
      isDecember: true,
      isChristmasFinished: false,
    }
  },
  computed: {
    user() {
      return this.$store.state.user && this.$store.state.user.name === this.$route.params.self ? this.$store.state.user : null
    },
  },
  beforeMount() {
    if (!this.user) {
      return
    }
    const now = new Date()

    if (now.getMonth() !== 11) {
      this.isDecember = false
      this.isLoading = false
      return
    }

    const day = now.getDate()
    if (day < 1 || day > 24) {
      this.isChristmasFinished = true
      this.isLoading = false
      return
    }

    const daily = this.user.daily
    if (!daily || !daily[day -1]) {
      this.isLoading = false
      return
    }

    this.imgSrc = daily[day - 1].file
    this.citation = daily[day - 1].citation
    this.link = daily[day - 1].link
    this.isLoading = false
  },
  methods: {
  },
}
</script>
