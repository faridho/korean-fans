<template>
  <div class="comments">
    <v-card class="mx-auto ml-5" flat>
      <v-list subheader>
        <v-subheader>
          <span class="mdi mdi-comment-text-multiple-outline mdi-18px pr-1"></span> Give Some Comments
        </v-subheader>

        <v-list-item v-if="user.loggedIn">
          <v-list-item-avatar>
            <v-img :src="user.data.photoUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="content">
            <v-textarea
              v-model="comment"
              placeholder="type here..."
              rows="1"
              :loading="isLoading"
              auto-grow
              clearable
              counter
              append-icon="mdi-send"
              @click:append="submitComment"
            ></v-textarea>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list three-line>
        <v-list-item v-for="(comment, index) in displayComments" :key="index">
          <v-list-item-avatar class="comment-avatar">
            <v-img :src="comment.photoUrl"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="content">
            <v-list-item-title class="comment-source">
              <router-link v-if="comment.commentByUserId"
                :to="{name: 'Profile', params: {username: comment.commentByUserId }}"
              >{{ comment.commentBy }}</router-link>
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle">{{ comment.commentText }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-for="(comment, index) in comments" :key="index">
          <v-list-item-avatar class="comment-avatar">
            <v-img :src="comment.commentAvatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content class="content">
            <v-list-item-title class="comment-source">
              <router-link v-if="comment.commentByUserId"
                :to="{name: 'Profile', params: {username: comment.commentByUserId }}"
              >{{ comment.commentBy }}</router-link>
            </v-list-item-title>
            <v-list-item-subtitle class="subtitle">{{ comment.commentText }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import * as firebase from "firebase/app";

export default {
  data: vm => ({
    paramsId: vm.$route.params.id,
    isLoading: false,
    comment: "",
    postComments: [],
    displayComments: [],
    comments: []
  }),

  computed: {
    ...mapGetters({
      user: "user"
    })
  },

  created() {
    this.loadComments();
  },

  methods: {
    async loadComments() {
      const db = firebase.firestore();
      const comments = await db
        .collection("koreanArticleComment")
        .where("articleId", "==", this.paramsId)
        .get()
        .then(querySnapshot => {
          let comments = [];
          querySnapshot.forEach(doc => {
            comments.push(doc.data());
          });
          return comments;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      let dataComments = [];
      for (const comment of comments) {
        const userId = comment.commentBy;

        const user = new Promise(resolve => {
          const docRef = db.collection("koreanUsers").doc(userId);
          docRef.get().then(doc => {
            if (doc.exists) {
              resolve(doc.data());
            }
          });
        });

        user.then(userData => {
          dataComments.push({
            commentByUserId: comment.commentBy,
            commentBy: userData.name,
            commentAvatar: userData.photoUrl,
            commentText: comment.comment
          });
        });
      }

      this.comments = dataComments;
    },

    async submitComment() {
      this.isLoading = true;
      const db = firebase.firestore();

      const payload = {
        articleId: this.paramsId,
        commentBy: this.user.data.userId,
        comment: this.comment,
        commentDate: Date.now()
      };
      const storeComment = await db
        .collection("koreanArticleComment")
        .add(payload)
        .then(function(docRef) {
          return docRef.id;
        });

      if (storeComment) {
        this.postComments.push({
          commentByUserId: this.user.data.userId,
          photoUrl: this.user.data.photoUrl,
          commentBy: this.user.data.displayName,
          commentText: this.comment
        });

        this.displayComments = this.postComments.reverse();
        this.comment = "";
        this.isLoading = false;
      }
    }
  }
};
</script>