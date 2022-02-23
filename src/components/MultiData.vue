<template>
  <div>
    <div style="margin-top: 20px">
      <select
        v-model="selectValue"
        name="cities"
        id="cities"
        style="margin-right: 10px"
      >
        <option value="istanbul">İstanbul</option>
        <option value="izmir">İzmir</option>
        <option value="ankara">Ankara</option>
        <option value="antalya">Antalya</option>
      </select>
      <button @click="setCityData">Get City Weather</button>
    </div>
    <div class="weatherBlock">
      <table style="width: 80%">
        <tr>
          <th>Timezone</th>
          <th>Date</th>
          <th>Main</th>
          <th>Description</th>
          <th>Icon</th>
          <th>Temperature (kelvin)</th>
          <th>Pressure (hPa)</th>
          <th>Humidity (%)</th>
        </tr>
        <tr v-for="(i, index) in this.$store.state.multiCities" :key="index">
          <td>{{ i.body.timezone }}</td>
          <td>{{ i.date }}</td>
          <td>{{ i.body.current.weather[0].main }}</td>
          <td>{{ i.body.current.weather[0].description }}</td>
          <td>
            <img
              :src="`http://openweathermap.org/img/wn/${i.body.current.weather[0].icon}@2x.png`"
              class="iconClass"
            />
          </td>
          <td>{{ i.body.current.temp }}</td>
          <td>{{ i.body.current.pressure }}</td>
          <td>{{ i.body.current.humidity }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "MultiData",
  data() {
    return {
      selectValue: "istanbul",
    };
  },
  methods: {
    setCityData() {
      this.$http
        .get(
          `http://localhost:8080/data/2.5/onecall?${this.latlong}&exclude=hourly&appid=40fca5fb681271be23e8dbc689d5a4ad`
        )
        .then(
          (response) => {
            const dateValue = new Date();
            const value = {
              date: dateValue,
              body: response.body,
            };
            this.$store.commit("setMultiCities", value);
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
  computed: {
    latlong() {
      if (this.selectValue === "istanbul") {
        return "lat=41.015137&lon=28.979530";
      } else if (this.selectValue === "izmir") {
        return "lat=38.412726&lon=27.138376";
      } else if (this.selectValue === "ankara") {
        return "lat=39.911652&lon=32.840305";
      } else {
        return "lat=36.908118&lon=30.695565";
      }
    },
  },
};
</script>

<style scoped>
.weatherBlock {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 10px;
}
</style>