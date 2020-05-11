<template>
  <div>
    <div class="float-left">
      <p class="title article-title">{{ mainTitle }}</p>
      <a href class="grey--text">View all 540 articles</a>
    </div>
    <div class="float-right">
      <v-btn rounded small color="indigo" dark @click="create">{{ buttonTitle }}</v-btn>
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
            >{{ article.title }}</v-card-title>
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
                  {{ article.reporter }}
                  <span class="grey--text ml-1">{{ article.created }}</span>
                </v-list-item-title>
              </v-list-item-content>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>
<script>
import { articles } from './content/articles'
export default {
  data: () => ({
    mainTitle: "Articles & Discussions",
    buttonTitle: "Create New Post",
    articles: articles
  }),

  methods: {
    create() {
      this.$router.push({ path:'/create' })
    }
  }
};
</script>