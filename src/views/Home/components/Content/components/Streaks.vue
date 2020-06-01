<template>
  <div class="streak">
    <div class="streak-header">
      <p class="title streak-title">{{ mainTitle }}</p>
      <span
        class="grey--text"
      >Write and publish articles & discussion on consecutive days to earn your streaks</span>
    </div>
    <v-list three-line class="streak-list">
      <template v-for="(profile, index) in profiles">
        <v-subheader
          class="streak-subheader"
          v-if="profile.header"
          :key="profile.header"
          v-text="profile.header"
        ></v-subheader>

        <v-divider v-else-if="profile.divider" :key="index" :inset="profile.inset"></v-divider>

        <v-list-item v-else :key="profile.name">
          <v-list-item-avatar>
            <v-img :src="profile.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="{name: 'Profile', params: {username: profile.id }}">{{ profile.name }}</router-link>
            </v-list-item-title>
            <v-list-item-subtitle>{{ profile.bio }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </div>
</template>
<script>
import * as firebase from "firebase/app";

export default {
  data: () => ({
    mainTitle: "Top Streaks",
    profiles: []
  }),

  created() {
    this.getProfiles();
  },

  methods: {
    async getProfiles() {
      const db = firebase.firestore();
      const profiles = await db
        .collection("koreanUsers")
        .get()
        .then(querySnapshot => {
          let profiles = [];
          querySnapshot.forEach(doc => {
            profiles.push({
              id: doc.id,
              name: doc.data().name,
              avatar: doc.data().photoUrl,
              bio: doc.data().bio
            });
          });
          return profiles;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
      const header = [{ header: "Today" }];
      this.profiles = header.concat(profiles);
    }
  }
};
</script>