<template>
  <div>
    <div class="float-left">
      <p class="title article-title">{{ mainTitle }}</p>
      <span class="article-more">
        <a href class="grey--text">View all 540 articles</a>
      </span>
    </div>
    <div class="float-right">
      <v-btn v-if="user.loggedIn" rounded small color="indigo" dark @click="create">{{ buttonTitle }}</v-btn>
    </div>
    <div class="float-left">
      <v-card class="articles-card" flat v-for="(article, index) in articles" :key="index">
        <div class="d-flex flex-no-wrap">
          <v-avatar size="125" tile>
            <v-img
              :src=article.thumbnail
            ></v-img>
          </v-avatar>
          <div>
            <v-card-title
              class="articles-title list-title"
            >
            <router-link
              :to="{ name: 'Detail', params:{ id: article.id} }"
            >
            {{ article.title }}
            </router-link></v-card-title>
            <v-card-subtitle>{{ article.desc }}</v-card-subtitle>
            <v-card-actions class="articles-card-action">
              <v-list-item-avatar class="articles-avatar">
                <v-avatar size="28">
                  <v-img
                    :src=article.avatar
                  ></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="articles-source">
                  <router-link 
                    :to="{name: 'Profile', params: {username: article.userId }}"
                  >
                    {{ article.by }}
                  </router-link>
                  <span class="grey--text ml-1">{{ article.created }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn icon>
                <span class="mdi mdi-bookmark-outline mdi-24px"></span>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import * as firebase from "firebase/app";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    mainTitle: "Articles & Discussions",
    buttonTitle: "Create New Post",
    articles: []
  }),

  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  created() {
    this.getArticles();
  },

  methods: {
    async getArticles() {
      const db = firebase.firestore();
      const articles = await db
        .collection("koreanArticles")
        .orderBy("postedDate", "desc")
        .get()
        .then(querySnapshot => {
          let articles = [];
          querySnapshot.forEach(doc => {
            articles.push({
              id: doc.id,
              createdById: doc.data().createdById,
              thumbnail: doc.data().thumbnail,
              title: doc.data().title,
              contentTex: doc.data().contentText.substr(0, 80),
              postedDate: doc.data().postedDate
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
            title: article.title,
            text: article.contentTex,
            created: article.postedDate
          });
        });
      }

      this.articles = dataArticles;
    },

    create() {
      this.$router.push({ path:'/create' })
    }
  }
};
</script>