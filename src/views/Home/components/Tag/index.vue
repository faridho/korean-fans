<template>
  <div>
    <div class="float-left">
      <v-sheet class="mx-auto tags" light>
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="n in 10" :key="n" v-slot:default="{ active, toggle }">
            <v-btn
              class="mx-2"
              :input-value="active"
              active-class="purple white--text"
              depressed
              rounded
              @click="toggle"
            >#TAG {{ n }}</v-btn>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </div>
  </div>
</template>
<script>
export default {};
</script>