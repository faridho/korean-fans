<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="12" sm="12" xs="12">
          <Breadcrumbs :breadcrumbs="newBreadcrumbs" />
          <Account />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row no-gutters>
        <v-col cols="4" md="4" sm="12" xs="12">
          <Photo :profile="profile" />
        </v-col>
        <v-col cols="8" md="8" sm="12" xs="12">
          <Articles />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import Photo from "./components/Photo";
import Articles from "./components/Articles";
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";

export default {
  data: vm => ({
    paramsId: vm.$route.params.username,
    breadcrumbs: breadcrumbsline.profile,
    newBreadcrumbs: [],
    profile: {}
  }),

  computed: {
    ...mapGetters({
      user: "user"
    })
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      const db = firebase.firestore();
      const profile = new Promise(resolve => {
        const docRef = db.collection("koreanUsers").doc(this.paramsId);
        docRef.get().then(doc => {
          if (doc.exists) {
            resolve(doc.data());
          }
        });
      });

      profile.then(userData => {
        const breadcrumbsActive = [
          {
            text: userData.name,
            disabled: true
          }
        ];

        this.newBreadcrumbs = this.breadcrumbs.concat(breadcrumbsActive);
        this.profile = userData;
      });
    }
  },
  components: {
    Breadcrumbs,
    Account,
    Photo,
    Articles
  }
};
</script>