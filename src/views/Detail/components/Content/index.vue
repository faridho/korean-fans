<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="8" md="8" sm="12">
        <Article />
      </v-col>
      <v-col cols="4" md="4" sm="12">
        <Comment />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Article from "./components/Article"
import Comment from "./components/Comment"
export default {
  data: () => ({

  }),

  components: {
      Article,
      Comment
  }
};
</script>