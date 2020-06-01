<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="12" sm="12" xs="12">
          <Category />
          <Account />
        </v-col>
      </v-row>
    </v-container>
    <Headline />
    <Content />
    <Footer />
  </div>
</template>
<script>
import Headline from "./components/Headline"
import Content from "./components/Content"
import Footer from "./components/Footer"
import Category from "./components/Category"
import Account from '@/components/TheAccount'

export default {
  data: () => ({
    model: null,
  }),

  components: {
    Headline,
    Content,
    Footer,
    Category,
    Account
  }
};
</script>