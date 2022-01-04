<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="10">
      <v-form @submit.prevent="connect">
        <v-card dark>
          <v-card-title class="headline">
            Dis moi qui tu es
          </v-card-title>
          <v-card-subtitle>
            Et tu auras une petite surprise
          </v-card-subtitle>
          <v-card-text>
            <v-alert
              v-model="hasError"
              dense
              outlined
              prominent
              dismissible
              text
              shaped
              type="warning">{{ error }}</v-alert>
            <v-text-field v-model="name" label="Nom"></v-text-field>
            <v-text-field v-model="password" type="password" label="Mot de passe"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn type="submit">
              Découvrir mon calendrier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  middleware({ store, redirect }) {
    // If the user is authenticated
    if (store.state.user) {
      return redirect('/' + store.state.user)
    }
  },
  data() {
    return {
      name: '',
      password: '',
      hasError: false,
      error: '',
    }
  },
  computed: {
    isConnected() {
      return !!this.$store.state.user
    },
  },
  mounted() {
    this.name = this.$cookies.get('name') || ''
    this.password = this.$cookies.get('password') || ''
  },
  methods: {
    async connect() {
      if (!this.name || !this.password) {
        this.hasError = true
        this.error = 'Oups. Mot de passe je vous prie.'
      }

      const success = await this.$store.dispatch('login', { name: this.name, password: this.password })
      if (!success) {
        this.hasError = true
        this.error = 'Tu mens ! Le père fouettard arrive, attention...'
      }

      this.$cookies.set('name', this.name, '100d')
      this.$cookies.set('password', this.password, '100d')

      return this.$router.push('/' + this.$store.state.user.name)
    },
    getCookie(cname) {
      const name = cname + "=";
      const decodedCookie = decodeURIComponent(this.$cookies);
      const ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  },
}
</script>
