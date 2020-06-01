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
            v-model="form.title"
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
          <ckeditor :editor="editor" v-model="form.contentText" :config="editorConfig"></ckeditor>
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
                placeholder="Chage a picture"
                prepend-icon="mdi-camera"
              ></v-file-input>
            </v-list-item>

            <v-img :src="form.imageUrl"></v-img>
          </v-list>

          <v-list subheader flat>
            <v-subheader>Categories</v-subheader>

            <v-list-item-group multiple>
              <v-list-item class="categories" v-for="(category, index) in categories" :key="index">
                <template>
                  <v-list-item-action>
                    <v-checkbox color="indigo" v-model="form.selectedCategories" :value="category"></v-checkbox>
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
                v-model="form.selectedTags"
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
              <v-btn
                color="indigo"
                :loading="updateLoading"
                rounded
                small
                dark
                @click="updateContenClicked"
              >Update</v-btn>
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
import { v4 as uuidv4 } from "uuid";
import { mapGetters } from "vuex";

export default {
  data: vm => ({
    paramsId: vm.$route.params.id,
    breadcrumbs: breadcrumbsline.update,

    //editor
    editor: BalloonEditor,
    editorConfig: {
      placeholder: "Start writing / type about your korean about"
    },

    //properties
    itemsTag: [],
    categories: ["Food", "K-Pop", "K-Drama", "Travel", "Culture"],

    //model
    form: {
      title: "",
      contentText: "",
      selectedTags: [],
      selectedCategories: [],
      thumbnail: [],
      imageUrl: ""
    },

    updateLoading: false
  }),

  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  created() {
    this.getArticle();
  },

  methods: {
    async getArticle() {
      const db = firebase.firestore();
      const article = new Promise(resolve => {
        const docRef = db.collection("koreanArticles").doc(this.paramsId);
        docRef.get().then(doc => {
          if (doc.exists) {
            resolve(doc.data());
          }
        });
      });

      article.then(data => {
        (this.form.title = data.title),
          (this.form.contentText = data.contentText),
          (this.form.selectedTags = data.tags),
          (this.form.selectedCategories = data.categories),
          (this.form.imageUrl = data.thumbnail);
      });
    },

    remove(item) {
      this.form.selectedTags.splice(this.form.selectedTags.indexOf(item), 1);
      this.form.selectedTags = [...this.form.selectedTags];
    },

    async updateContenClicked() {
      this.updateLoading = true;

      const db = firebase.firestore();
      const file = this.form.thumbnail;
      console.log(this.form.thumbnail)
      
      let imageUrl;
      if (file.name) {
        const newFileName = uuidv4();
        const metadata = {
          contentType: "image/jpeg"
        };
        const storage = firebase.storage();
        const storageRef = storage.ref();

        storageRef.child(`thumbnails/${newFileName}`).put(file, metadata);
        imageUrl = this.form.imageUrl;
      } else {
        imageUrl = this.form.imageUrl;
      }

      const payload = {
        categories: this.form.selectedCategories,
        contentText: this.form.contentText,
        tags: this.form.selectedTags,
        thumbnail: imageUrl,
        title: this.form.title,
      }

      const docRef = db.collection("koreanArticles").doc(this.paramsId);

      const result = docRef
        .update(payload)
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });

      if (result) {
        this.updateLoading = false
        this.$router.push({ path: `/detail/${this.paramsId}`})
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
