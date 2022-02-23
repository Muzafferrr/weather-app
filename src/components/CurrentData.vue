<template>
  <div>
    <div v-if="loading">
        <row-value></row-value> 
        <some-value></some-value>
    </div>
    <button @click="currentValue()">Get Weather</button>
  </div>
</template>

<script>
import RowValue from "./RowValue.vue";
import SomeValue from "./SomeValue.vue"
export default {
  data() {
    return {
    };
  },
  components: {
    RowValue,
    SomeValue
  },
  methods: {
    currentValue() {
      this.$http
        .get(
          "http://localhost:8080/data/2.5/weather?q=London,uk&appid=40fca5fb681271be23e8dbc689d5a4ad"
        )
        .then(
          (response) => {
            const dateValue = new Date();
            const value = {
              date: dateValue,
              body: response.body,
            };
            this.$store.commit('setWeatherValue', value)
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
  computed: {
    loading(){
      if (this.$store.state.weatherValues.length === 0) {
        return false;
      }else{
          return true
      }
    }
  }
};
</script>

<style>
</style>