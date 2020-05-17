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
    <v-container>
      <v-row no-gutters>
        <v-col cols="4" md="4" sm="12" xs="12">
          <Photo />
        </v-col>
        <v-col cols="8" md="8" sm="12" xs="12">
          <Articles />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import Photo from "./components/Photo";
import Articles from "./components/Articles";
export default {
  data: vm => ({
    paramsId: vm.$route.params.username,
    breadcrumbs: breadcrumbsline.profile
  }),

  computed: {
    newBreadcrumbs() {
      const breadcrumbsActive = [
        {
          text: "Faridho Leonardhio",
          disabled: true
        }
      ];

      return this.breadcrumbs.concat(breadcrumbsActive);
    }
  },

  components: {
    Breadcrumbs,
    Account,
    Photo,
    Articles
  }
};
</script>