<template>
  <div class="streak">
    <div class="streak-header">
        <p class="title streak-title">{{ mainTitle }}</p>
        <span class="grey--text">Write and publish articles & discussion on consecutive days to earn your streaks</span>
    </div>
    <v-list three-line class="streak-list">
        <template v-for="(item, index) in items">
        <v-subheader class="streak-subheader" v-if="item.header" :key="item.header" v-text="item.header"></v-subheader>

        <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

        <v-list-item v-else :key="item.title">
            <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
            <v-list-item-title>
              <router-link
                :to="{name: 'Profile', params: {username: 'faridho'}}"
              >
                {{ item.title }}
              </router-link>
            </v-list-item-title>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        </template>
    </v-list>
  </div>
</template>
<script>
export default {
  data: () => ({
    mainTitle: "Top Streaks",
    items: [
      { header: "Today" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ',
        subtitle:
          "Wish I could come, but I'm out of town this weekend."
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          "Do you have Paris recommendations? Have you ever been?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          "Have any ideas about what we should get Heidi for her birthday?"
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  })
};
</script>