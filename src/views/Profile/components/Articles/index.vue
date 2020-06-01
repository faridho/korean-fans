<template>
  <div>
    <div class="float-left">
      <p class="title article-title pl-2 pb-3">{{ mainTitle }}</p>
    </div>
    <div class="float-right">
      <v-btn
        class="mb-3"
        v-if="user.loggedIn"
        rounded
        small
        color="indigo"
        dark
        @click="create"
      >{{ buttonTitle }}</v-btn>
    </div>
    <div class="float-right">
      <v-divider></v-divider>
      <v-card class="articles-card" flat v-for="(article, index) in articles" :key="index">
        <div class="d-flex flex-no-wrap">
          <v-avatar size="125" tile>
            <v-img :src="article.thumbnail"></v-img>
          </v-avatar>
          <div>
            <v-card-title class="articles-title list-title">
              <router-link
                v-if="article.id"
                :to="{ name: 'Detail', params:{ id: article.id} }"
              >{{ article.title }}</router-link>
            </v-card-title>
            <v-card-subtitle v-html="article.text"></v-card-subtitle>
            <v-card-actions class="articles-card-action">
              <v-list-item-avatar class="articles-avatar">
                <v-avatar size="28">
                  <v-img :src="article.avatar"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="articles-source">
                  <router-link
                    :to="{name: 'Profile', params: {username: article.userId}}"
                  >{{ article.by }}</router-link>
                  <span class="grey--text ml-1">{{ article.created }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn icon v-if="article.userId === paramsId">
                <v-menu bottom offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn class="ma-2" v-on="on" icon>
                      <span class="mdi mdi-dots-vertical mdi-24px"></span>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item @click="updateArticle(article.id)">
                      <v-list-item-title>Edit</v-list-item-title>
                    </v-list-item>
                    <v-list-item @click="deleteArticle(article.id, index)">
                      <v-list-item-title>Delete</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-btn>
              <v-btn icon v-else>
                <span class="mdi mdi-bookmark-outline mdi-24px"></span>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
    <v-dialog v-model="dialog" max-width="310">
      <v-card>
        <v-card-title class="title">Are you sure want to delete</v-card-title>
        <v-card-text>If you click button Agree below your article can't show on your profile and other pages</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Disagree</v-btn>
          <v-btn color="red darken-1" text @click="agreeToDelete(articleId, articleindex)">Agree</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";

export default {
  data: vm => ({
    paramsId: vm.$route.params.username,
    mainTitle: "Articles",
    buttonTitle: "Create New Post",
    articles: [],
    dialog: false,
    articleId: "",
    articleindex: 0
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
        .where("createdById", "==", this.paramsId)
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

    async updateArticle(id) {
      this.$router.push({ name: 'Update', params: { id: id }})
    },

    async deleteArticle(id, index) {
      this.dialog = true;
      this.articleindex = index;
      this.articleId = id;
    },

    async agreeToDelete(id, articleindex) {
      const db = firebase.firestore();
      const remove = await db
        .collection("koreanArticles")
        .doc(id)
        .delete()
        .then(() => {
          return true;
        })
        .catch(error => {
          console.error("Error removing document: ", error);
        });

      if (remove) {
        this.dialog = false;
        this.articles.splice(articleindex, 1);
      }
    },

    create() {
      this.$router.push({ path: "/create" });
    }
  }
};
</script>