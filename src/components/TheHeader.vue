<template>
  <v-toolbar flat class="toolbar-page">
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12">
          <div class="icon-section">
            <img
              src="https://res.cloudinary.com/duzt2dvg6/image/upload/v1587571007/KOREAN/ICON/photo-camera.png"
              class="icon-title"
            />
          </div>
          <div class="menu-section">
            <ul>
              <li>
                <a href="#home" class="active">Feed</a>
              </li>
              <li>
                <a href="#news">Discover</a>
              </li>
              <li>
                <a href="#contact">Community</a>
              </li>
            </ul>
          </div>
          <v-autocomplete
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            clearable
            flat
            hide-details
            hide-selected
            item-text="title"
            item-value="id"
            label="What is your favourite korean about?"
            solo-inverted
          >
            <template v-slot:no-data>
              <v-list-item>
                <v-list-item-title>
                  Search for your favorite
                  <strong>Korean Drama</strong>
                </v-list-item-title>
              </v-list-item>
            </template>
            <template v-slot:selection="{ attr, on, item, selected }">
              <v-chip
                v-bind="attr"
                :input-value="selected"
                color="blue-grey"
                class="white--text"
                v-on="on"
              >
                <span v-text="item.title"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >{{ item.title.charAt(0) }}</v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script>
import * as firebase from "firebase/app";
export default {
  data: () => ({
    isLoading: false,
    items: [],
    search: null
  }),

  watch: {
    async search() {
      if (this.items.length > 0) return;
      this.isLoading = true;

      const db = firebase.firestore();
      const articles = await db
        .collection("koreanArticles")
        .get()
        .then(querySnapshot => {
          let articles = [];
          querySnapshot.forEach(doc => {
            articles.push({
              id: doc.id,
              title: doc.data().title
            });
          });
          return articles;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      this.items = articles;
      this.isLoading = false;
    }
  }
};
</script>