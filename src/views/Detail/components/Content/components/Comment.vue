<template>
  <div class="comments">
    <v-card class="mx-auto ml-5" flat>
      <v-list subheader>
        <v-subheader>
          <span class="mdi mdi-comment-text-multiple-outline mdi-18px pr-1"></span> Give Some Comments
        </v-subheader>

        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="content">
            <v-textarea class="mx-2" placeholder="type here..." rows="1"></v-textarea>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list three-line>
        <v-list-item>
          <v-list-item-avatar class="comment-avatar">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="content">
            <v-list-item-title>Lee Kyo-ku</v-list-item-title>
            <v-list-item-subtitle
              class="subtitle"
            >I'll be in your neighborhood doing errands this weekend. Do you want to hang out?</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-avatar class="comment-avatar">
            <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Lee Kyo-ku</v-list-item-title>
            <v-list-item-subtitle
              class="subtitle"
            >I'll be in your neighborhood doing errands this weekend. Do you want to hang out? I'll be in your neighborhood doing errands this weekend. Do you want to hang out</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({})
};
</script>