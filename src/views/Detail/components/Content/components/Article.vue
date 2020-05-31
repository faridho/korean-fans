<template>
  <div class="details">
    <v-card class="mx-auto" flat>
      <v-list-item class="pl-0">
        <v-list-item-avatar>
          <v-img :src="article.photoUrl"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="article-source">
            <router-link v-if="article.createdById" :to="{name: 'Profile', params: {username: article.createdById }}">{{ article.name}}</router-link>
          </v-list-item-title>
          <v-list-item-subtitle>{{ article.postedDate }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-img class="white--text align-end" height="400px" :src="article.thumbnail"></v-img>
      <v-card-title class="title-text pl-0 pr-0">{{ article.title }}</v-card-title>
      <v-card-text class="text--primary pl-0 pr-0 summary">
        <span v-html="article.contentText"></span>
      </v-card-text>
      <v-card-actions>
        <v-chip
          v-for="(tag, index) in article.tags"
          :key="index"
          class="ma-2"
          color="indigo"
          label
          text-color="white"
          small
        >
          <v-icon left>mdi-label</v-icon>
          {{ tag }}
        </v-chip>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  props: {
    article: Object
  },

  data: () => ({})
};
</script>