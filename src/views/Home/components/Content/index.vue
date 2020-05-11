<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="7" md="7" sm="12">
          <Articles />
      </v-col>
      <v-col cols="5" md="5" sm="12">
          <Streaks />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Articles from "./components/Articles";
import Streaks from "./components/Streaks";
export default {
  data: () => ({}),

  components: {
    Articles,
    Streaks
  }
};
</script>