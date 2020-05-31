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
    <Content :article="article" />
  </div>
</template>
<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import Content from "./components/Content";
import * as firebase from "firebase/app";

export default {
  data: vm => ({
    paramsId: vm.$route.params.id,
    breadcrumbs: breadcrumbsline.detail,
    newBreadcrumbs: [],
    article: {},
    comments: []
  }),

  created() {
    this.loadArticles();
  },

  methods: {
    async loadArticles() {
      const db = firebase.firestore();
      const docRef = db.collection("koreanArticles").doc(this.paramsId);

      const dataFromCollection = await docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            const article = doc.data();
            const userId = doc.data().createdById;

            const user = new Promise(resolve => {
              const docRef = db.collection("koreanUsers").doc(userId);
              docRef.get().then(doc => {
                if (doc.exists) {
                  resolve(doc.data());
                }
              });
            });

            const loadedArticle = user.then(userData => {
              return Object.assign(article, userData);
            });
           
            return loadedArticle;
          } else {
            return {};
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      const breadcrumbsActive = [
        {
          text: dataFromCollection.title,
          disabled: true
        }
      ];

      this.newBreadcrumbs = this.breadcrumbs.concat(breadcrumbsActive);
      this.article = dataFromCollection;
    }
  },

  components: {
    Breadcrumbs,
    Account,
    Content
  }
};
</script>