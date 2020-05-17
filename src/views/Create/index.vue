<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="12" sm="12" xs="12">
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
        <Account />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="9" md="9" sm="12" xs="12">
        <Editor />
      </v-col>
      <v-col cols="3" md="3" sm="12" xs="12">
        <Properties />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import Editor from "./components/Editor";
import Properties from "./components/Properties";

export default {
  data: () => ({
    breadcrumbs: breadcrumbsline.create
  }),

  components: {
    Breadcrumbs,
    Account,
    Editor,
    Properties
  }
};
</script>
