<template>
  <div>
    <div class="float-left">
      <p class="title article-title pl-2 pb-3">{{ mainTitle }}</p>
    </div>
    <div class="float-right">
      <v-btn class="mb-3" rounded small color="indigo" dark @click="create">{{ buttonTitle }}</v-btn>
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
              <router-link :to="{ name: 'Detail', params:{ id: article.id} }">{{ article.title }}</router-link>
            </v-card-title>
            <v-card-subtitle>{{ article.desc }}</v-card-subtitle>
            <v-card-actions class="articles-card-action">
              <v-list-item-avatar class="articles-avatar">
                <v-avatar size="28">
                  <v-img :src="article.avatar"></v-img>
                </v-avatar>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="articles-source">
                  <router-link
                    :to="{name: 'Profile', params: {username: 'faridho'}}"
                  >{{ article.reporter }}</router-link>
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
import { articles } from "./content/articles";
export default {
  data: () => ({
    mainTitle: "My Articles",
    buttonTitle: "Create New Post",
    articles: articles
  }),

  methods: {
    create() {
      this.$router.push({ path: "/create" });
    }
  }
};
</script>