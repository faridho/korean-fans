<template>
  <div>
    <div class="float-left">
      <v-sheet class="mx-auto tags" light>
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="(category, index) in categories" :key="index">
            <v-btn
              class="mx-2"
              color="grey darken-3 white--text"
              depressed
              @click="toggle"
            >#{{ category }}</v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    categories: ["Food", "K-Pop", "K-Drama", "Travel", "Culture"]
  })
};
</script>