require("dotenv").config();
const {
  readInput,
  inquirerMenu,
  pause,
  listPlaces,
} = require("./helpers/inquirer");
const Search = require("./models/search");

const main = async () => {
  let opc = 0;
  const searhes = new Search();
  do {
    opc = await inquirerMenu();

    switch (opc) {
      case 1:
        const place = await readInput("City: ");
        const places = await searhes.city(place);
        const Id = await listPlaces(places);
        if (Id === "0") continue;

         

        const selectPlace = places.find((p) => p.id === Id);
        console.log(`${selectPlace.name}`);


         //save in db
         searhes.addHistory(selectPlace.name);

        const weather = await searhes.informationWeather(
          selectPlace.lat,
          selectPlace.lng
          );
          //show weather
          console.clear();
        console.log("\nCity information");
        console.log("City: ", selectPlace.name);
        console.log("Lat: ", selectPlace.lat);
        console.log("Lon: ", selectPlace.lng);
        console.log("Temperature: ", weather.tem);
        console.log("minimal: ", weather.min);
        console.log("maximal: ", weather.max);
        console.log("description: ", weather.description);
        console.log("humidity: ", weather.humidity);

        break;
      case 2:
        searhes.historyCapitalize.forEach((element,i) => {
          const idx =`${i+1}. `.green;
          console.log(idx,element);
        });
          break;
    }
    await pause();
  } while (opc !== 0);
};

main();
