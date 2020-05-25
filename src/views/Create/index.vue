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
        <div class="title-section">
          <v-text-field
            class="editor-title-post"
            label="Add a title"
            single-line
            outlined
            autofocus
            counter="150"
            clearable
          ></v-text-field>
        </div>
        <div class="editor-section">
          <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        </div>
      </v-col>
      <v-col cols="3" md="3" sm="12" xs="12">
        <v-card class="mx-auto properties float-right" outlined flat>
          <v-list subheader flat>
            <v-subheader>Thumbnail</v-subheader>
            <v-list-item>
              <v-file-input
                v-model="form.thumbnail"
                accept="image/*"
                placeholder="Pick a picture"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-list-item>
          </v-list>

          <v-list subheader flat>
            <v-subheader>Categories</v-subheader>

            <v-list-item-group multiple>
              <v-list-item class="categories" v-for="(category, index) in categories" :key="index">
                <template>
                  <v-list-item-action>
                    <v-checkbox color="indigo"></v-checkbox>
                  </v-list-item-action>

                  <v-list-item-content>
                    <v-list-item-title>{{ category }}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-list subheader flat>
            <v-subheader>Tags</v-subheader>
            <v-list-item>
              <v-combobox
                v-model="tags"
                :items="itemsTag"
                chips
                clearable
                multiple
                placeholder="Select tags"
              >
                <template v-slot:selection="{ attrs, item, select, selected }">
                  <v-chip
                    v-bind="attrs"
                    :input-value="selected"
                    close
                    @click="select"
                    small
                    @click:close="remove(item)"
                  >
                    <strong>{{ item }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </v-list-item>
          </v-list>

          <v-list two-line subheader>
            <v-list-item class="float-right">
              <v-btn color="indigo" rounded small dark @click="publishContenClicked">Publish</v-btn>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import CKEditor from "@ckeditor/ckeditor5-vue";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";
import * as firebase from "firebase/app";

export default {
  data: () => ({
    breadcrumbs: breadcrumbsline.create,
    //editor
    editor: BalloonEditor,
    editorData: "",
    editorConfig: {
      placeholder: "Start writing / type about your korean about"
    },
    //properties
    categories: ["Food", "K-Pop", "K-Drama", "Travel", "Culture"],
    tags: [],
    itemsTag: [],

    //model
    form: {
      thumbnail: []
    }
  }),

  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    },

    publishContenClicked() {
      const file = this.form.thumbnail;
      console.log(file)
      const metadata = {
        contentType: "image/jpeg"
      }
      const storage = firebase.storage();
      const storageRef = storage.ref();
      
      try {
        storageRef.child('thumbnails/' + file.name).put(file, metadata)
        console.log("success")
      } catch (error) {
        alert(error)
      }
    }
  },

  components: {
    Breadcrumbs,
    Account,
    ckeditor: CKEditor.component
  }
};
</script>
