<template>
  <v-card class="mx-auto photo-card text-center mr-3" flat outlined>
    <v-avatar class="profile photo-display" color="grey" size="200" tile>
      <v-img src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
    </v-avatar>
    <v-card-title class="name-display text-center">Faridho Leonardhio</v-card-title>
    <v-card-text>
      <v-rating
        class="text-center"
        :value="4.5"
        color="amber"
        dense
        half-increments
        readonly
        size="14"
      ></v-rating>
      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>
    <v-card-actions class="text-center follow-action pb-10">
      <v-btn color="indigo" outlined dark small>
        <span class="mdi mdi-face-recognition mdi-18px" left></span>
        Follow
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  data: () => ({})
};
</script>