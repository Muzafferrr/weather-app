<template>
  <div>
    <button @click="currentValue">Get Weather</button>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResources from 'vue-resource'
Vue.use(VueResources)
export default {
  methods: {
    currentValue() {
      this.$http.get("http://localhost:8080/data/2.5/weather?q=London,uk&appid=40fca5fb681271be23e8dbc689d5a4ad")
        .then(
          (response) => {
            console.log(response.body);
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
};
</script>

<style>
</style>