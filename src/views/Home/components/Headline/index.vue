<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3" md="3" sm="3" v-for="(new_, index) in news" :key="index">
        <v-card class="news-card">
          <v-img class="white--text news-img" :src="new_.thumbnail">
            <v-card-title>
              <span class="title news-title">
                <router-link
                  :to="{ 
                name: 'Detail',
                params: {
                id: new_.id
                }              
            }"
                >{{ new_.title }}</router-link>
              </span>
            </v-card-title>

            <v-card-actions>
              <v-list-item class="news-avatar">
                <v-list-item-avatar class="news-avatar">
                  <v-avatar size="28">
                    <img :src="new_.avatar" alt="John" />
                  </v-avatar>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title class="news-source">
                    <router-link
                      :to="{name: 'Profile', params: {username: 'faridho'}}"
                    >
                      {{ new_.reporter }}
                    </router-link>
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
import { news } from "./content";
export default {
  data: () => ({
    news: news
  })
};
</script>