<template>
  <div style="margin-top: 20px">
    <button @click="hourlyValue()">Get Hourly Weather</button>
    <div
      class="weatherBlock"
      v-if="this.$store.state.hourlyWeather.length !== 0"
    >
      <table style="width: 80%">
        <tr>
          <th>Date</th>
          <th v-for="(i, index) in getAfterDate" :key="index">
            {{ new Date(i.dt * 1000) }}
          </th>
        </tr>
        <tr>
          <td>Temperature (kelvin)</td>
          <td v-for="(i, index) in getAfterDate" :key="index">
            {{ Math.round(i.temp - 273.15) + " °C" }}
          </td>
        </tr>
        <tr>
          <td>Feels Temperature (kelvin)</td>
          <td v-for="(i, index) in getAfterDate" :key="index">
            {{ Math.round(i.feels_like - 273.15) + " °C" }}
          </td>
        </tr>
        <tr>
          <td>Pressure (hPa)</td>
          <td v-for="(i, index) in getAfterDate" :key="index">
            {{ i.pressure }}
          </td>
        </tr>
        <tr>
          <td>Humidity (%)</td>
          <td v-for="(i, index) in getAfterDate" :key="index">
            {{ i.humidity }}
          </td>
        </tr>
        <tr>
          <td>Wind Speed (meter/sec)</td>
          <td v-for="(i, index) in getAfterDate" :key="index">
            {{ i.wind_speed }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "HourlyWeather",
  methods: {
    hourlyValue() {
      this.$http
        .get(
          "http://localhost:8080/data/2.5/onecall?lat=41.015137&lon=28.979530&exclude={part}&appid=40fca5fb681271be23e8dbc689d5a4ad"
        )
        .then(
          (response) => {
            const dateValue = new Date();
            const value = {
              date: dateValue,
              body: response.body,
            };
            this.$store.commit("setHourlyWeather", value);
          },
          (response) => {
            console.log(response);
          }
        );
    },
  },
  computed: {
    getAfterDate() {
      return this.$store.state.hourlyWeather[0].body.hourly.filter(
        (x) => new Date(x.dt * 1000).getDay() === new Date().getDay() + 1
      );
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