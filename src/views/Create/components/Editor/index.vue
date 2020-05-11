<template>
  <div>
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
  </div>
</template>
<script>
import Vue from "vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import BalloonEditor from "@ckeditor/ckeditor5-build-balloon";

Vue.use(CKEditor);
export default {
  data: () => ({
    editor: BalloonEditor,
    editorData: "",
    editorConfig: {
      placeholder: "Start writing / type about your korean about"
    }
  }),

  components: {
    ckeditor: CKEditor.component
  }
};
</script>