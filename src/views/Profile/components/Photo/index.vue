<template>
  <v-card class="mx-auto photo-card text-center mr-3" flat outlined>
    <v-avatar class="profile photo-display" color="grey" size="200" tile>
      <v-img :src=profile.photoUrl></v-img>
    </v-avatar>
    <v-card-title class="name-display text-center">{{  profile.name }}</v-card-title>
    <v-card-text>
      <v-rating
        class="text-center"
        :value=profile.status
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>
      <div>{{ profile.bio }}</div>
    </v-card-text>
    <v-card-actions class="text-center follow-action pb-10" v-if="user.data.userId === paramsId">
      <v-btn color="indigo" outlined dark small>
        <span class="mdi mdi-pencil mdi-18px" left></span>
        Edit Profile
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";


export default {
  props: {
    profile: Object
  },

  data: vm => ({
    paramsId: vm.$route.params.username
  }),

  computed: {
    ...mapGetters({
      user: "user"
    })
  }
};
</script>