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
            item-text="name"
            item-value="symbol"
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
                <v-icon left>mdi-coin</v-icon>
                <span v-text="item.name"></span>
              </v-chip>
            </template>
            <template v-slot:item="{ item }">
              <v-list-item-avatar
                color="indigo"
                class="headline font-weight-light white--text"
              >{{ item.name.charAt(0) }}</v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-icon>mdi-coin</v-icon>
              </v-list-item-action>
            </template>
          </v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-toolbar>
</template>
<script>
export default {
  data: () => ({
    isLoading: false,
    items: [],
    search: null
  }),

  watch: {
    search() {
      if (this.items.length > 0) return;
      this.isLoading = true;

      fetch("https://api.coingecko.com/api/v3/coins/list")
        .then(res => res.clone().json())
        .then(res => {
          this.items = res;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    }
  }
};
</script>