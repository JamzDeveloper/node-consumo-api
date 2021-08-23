const fs = require("fs");
const axios = require("axios");
class Search {
  history = [];
  dbPath = "./db/database.json";

  constructor() {
    this.readDB();
  }
  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      language: "es",
    };
  }
  get paramsAppWearther() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }
  get historyCapitalize() {
    return this.history.map((city) => {
      let palabra = city.split(" ");
      palabra = palabra.map(
        (palabra) => palabra.charAt(0).toUpperCase() + palabra.slice(1)
      );
      return palabra.join(" ");
    });
  }
  async city(place) {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
        params: this.paramsMapBox,
      });
      const resp = await instance.get();

      return resp.data.features.map((place) => ({
        id: place.id,
        name: place.place_name,
        lng: place.center[0],
        lat: place.center[1],
      }));
    } catch (err) {
      return [];
    }
  }
  async informationWeather(lat, lon) {
    try {
      const instance = axios.create({
        baseURL: `https://api.openweathermap.org/data/2.5/weather`,
        params: { ...this.paramsAppWearther, lat, lon },
      });

      const resp = await instance.get();
      const { weather, main } = resp.data;

      return {
        description: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        tem: main.temp,
        humidity: main.humidity,
      };
    } catch (err) {
      return err;
    }
  }

  addHistory(city) {
    if (this.history.includes(city.toLocaleLowerCase())) {
      return;
    }
    this.history =this.history.slice(0,5); 

    this.history.unshift(city.toLocaleLowerCase());
    this.saveDB();
  }
  saveDB() {
    const payLoad = {
      history: this.history,
    };
    //console.log(payLoad);

    fs.writeFileSync(this.dbPath, JSON.stringify(payLoad));
  }
  readDB() {
    if (!fs.existsSync(this.dbPath)) return;
    this.history = JSON.parse(fs.readFileSync(this.dbPath)).history;
  }
}

module.exports = Search;
