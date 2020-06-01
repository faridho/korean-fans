<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3" md="3" sm="3" v-for="(article, index) in articles" :key="index">
        <v-card class="news-card">
          <v-img class="white--text news-img" :src="article.thumbnail">
            <v-card-title>
              <span class="title news-title">
                <router-link
                  :to="{ 
                name: 'Detail',
                params: {
                id: article.id
                }              
            }"
                >{{ article.title }}</router-link>
              </span>
            </v-card-title>

            <v-card-actions>
              <v-list-item class="news-avatar">
                <v-list-item-avatar class="news-avatar">
                  <v-avatar size="28">
                    <img :src="article.avatar" alt="John" />
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="news-source">
                    <router-link
                      :to="{name: 'Profile', params: {username: article.userId }}"
                    >{{ article.by }}</router-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as firebase from "firebase/app";

export default {
  data: () => ({
    articles: []
  }),

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      const db = firebase.firestore();
      const articles = await db
        .collection("koreanArticles")
        .orderBy("postedDate", "desc")
        .limit(4)
        .get()
        .then(querySnapshot => {
          let articles = [];
          querySnapshot.forEach(doc => {
            articles.push({
              id: doc.id,
              createdById: doc.data().createdById,
              thumbnail: doc.data().thumbnail,
              title: doc.data().title
            });
          });
          return articles;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      let dataArticles = [];
      for (const article of articles) {
        const userId = article.createdById;

        const user = new Promise(resolve => {
          const docRef = db.collection("koreanUsers").doc(userId);
          docRef.get().then(doc => {
            if (doc.exists) {
              resolve(doc.data());
            }
          });
        });

        user.then(userData => {
          dataArticles.push({
            userId: article.createdById,
            by: userData.name,
            avatar: userData.photoUrl,
            id: article.id,
            thumbnail: article.thumbnail,
            title: article.title
          });
        });
      }

      this.articles = dataArticles;
    }
  }
};
</script>