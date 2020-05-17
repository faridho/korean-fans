<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="12" sm="12" xs="12">
          <Breadcrumbs :breadcrumbs="newBreadcrumbs" />
          <Account />
        </v-col>
      </v-row>
    </v-container>
    <Content />
  </div>
</template>
<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import { articles } from "./content/articles";
import Content from "./components/Content";

export default {
  data: vm => ({
    paramsId: vm.$route.params.id,
    breadcrumbs: breadcrumbsline.detail,
    newBreadcrumbs: []
  }),

  created() {
    this.getBreadcrumbs();
  },

  methods: {
    async getBreadcrumbs() {
      const { title } = articles.find(item => item.id === this.paramsId)
      const newTitle = await title
      const breadcrumbsActive = [
        {
          text: newTitle,
          disabled: true
        }
      ]

      this.newBreadcrumbs = await this.breadcrumbs.concat(breadcrumbsActive)
    }
  },

  components: {
    Breadcrumbs,
    Account,
    Content
  }
};
</script>