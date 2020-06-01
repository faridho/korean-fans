<template>
  <div>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12" md="12" sm="12" xs="12">
          <Breadcrumbs :breadcrumbs="breadcrumbs" />
          <Account />
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row no-gutters>
        <v-col cols="12">
          <v-card class="mx-auto" max-width="40%" flat outlined>
            <v-form ref="form" v-model="valid" :lazy-validation="lazy">
              <v-list subheader three-line>
                <v-subheader>Avatar</v-subheader>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Select Photo from your computer</v-list-item-title>
                    <v-list-item-subtitle>
                      <v-file-input
                        v-model="form.thumbnail"
                        accept="image/*"
                        placeholder="Pick a picture"
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-list flat subheader three-line>
                <v-subheader>General</v-subheader>
                <v-list-item-group>
                  <v-list-item>
                    <template>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-text-field
                            v-model="form.name"
                            :rules="nameRules"
                            outlined
                            placeholder="Full Name"
                          ></v-text-field>
                        </v-list-item-title>
                        <v-list-item-subtitle>This field will be display on your profile and your content</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                  <v-list-item>
                    <template>
                      <v-list-item-content>
                        <v-list-item-title>
                          <v-textarea
                            outlined
                            name="input-7-4"
                            v-model="form.bio"
                            auto-grow
                            placeholder="Bio"
                          ></v-textarea>
                        </v-list-item-title>
                        <v-list-item-subtitle>This field is summary about you (Hobby, Character, School etc)</v-list-item-subtitle>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
              <v-divider></v-divider>
              <v-list flat subheader three-line>
                <v-list-item-group>
                  <v-list-item>
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      :loading="submitLoading"
                      @click="updateProfile"
                    >Update</v-btn>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar v-model="snackbar.status" top>
      {{ snackbar.text }}
      <v-btn color="pink" text @click="snackbar.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
import Breadcrumbs from "@/components/TheBreadcrumbs";
import Account from "@/components/TheAccount";
import { breadcrumbsline } from "@/views/config";
import * as firebase from "firebase/app";

export default {
  data: vm => ({
    paramsId: vm.$route.params.username,
    breadcrumbs: breadcrumbsline.settings,
    settings: [],
    valid: true,

    form: {
      thumbnail: [],
      name: "",
      bio: ""
    },

    nameRules: [
      v => !!v || "Full Name is required",
      v => (v && v.length <= 20) || "Name must be less than 20 characters"
    ],

    lazy: false,
    submitLoading: false,

    snackbar: {
      status: false,
      text: ""
    }
  }),

  created() {
    this.getProfile();
  },

  methods: {
    async getProfile() {
      const db = firebase.firestore();
      const docRef = db.collection("koreanUsers").doc(this.paramsId);

      const dataFromCollection = await docRef
        .get()
        .then(doc => {
          if (doc.exists) {
            return doc.data();
          } else {
            return {};
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      this.form.name = dataFromCollection.name;
      this.form.bio = dataFromCollection.bio;
    },

    updateProfile() {
      this.submitLoading = true;
      this.$refs.form.validate();
      const db = firebase.firestore();
      const docRef = db.collection("koreanUsers").doc(this.paramsId);

      const result = docRef
        .update({
          name: this.form.name,
          bio: this.form.bio
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          console.error("Error updating document: ", error);
        });

      if (result) {
        this.snackbar.status = true;
        this.snackbar.text = "Update profile successfuly";
        this.submitLoading = false;
      }

      this.submitLoading = false;
    }
  },

  components: {
    Breadcrumbs,
    Account
  }
};
</script>