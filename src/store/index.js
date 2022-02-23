import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        weatherValues: [],
        hourlyWeather: [],
        multiCities: []
    },
    mutations: {
        setWeatherValue(state, payload) {
            state.weatherValues.unshift(payload);
        },
        setHourlyWeather(state, payload) {
            state.hourlyWeather.unshift(payload);
        },
        setMultiCities(state, payload) {
            state.multiCities.unshift(payload);
        }
    }
})