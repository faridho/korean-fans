<template>
  <v-card class="mx-auto properties float-right" outlined flat>
    <v-list subheader flat>
      <v-subheader>Thumbnail</v-subheader>
      <v-list-item>
        <v-file-input
          accept="image/*p"
          placeholder="Pick an picture"
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
          :items="items"
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
        <v-btn color="indigo" rounded small dark>Publish</v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    categories: ["Food", "K-Pop", "K-Drama", "Travel", "Culture"],
    tags: [],
    items: ["Streaming", "Eating"]
  }),

  methods: {
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1);
      this.tags = [...this.tags];
    }
  }
};
</script>