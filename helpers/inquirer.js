const inquirer = require("inquirer");
require("colors");

const question = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Searh city`,
      },
      {
        value: 2,
        name: `${"2.".green} History`,
      },
      {
        value: 0,
        name: `${"0.".green} exit`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();

  console.log("=========================".green);
  console.log("   select an option");
  console.log("=========================".green);

  const { option } = await inquirer.prompt(question);
  return option;
};

const pause = async () => {
  const question = [
    {
      type: "input",
      name: "pause",
      message: "Press enter to continue...".green,
    },
  ];

  await inquirer.prompt(question);
};

const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate: (value) => {
        if (value.length === 0) {
          return "Please enter a description";
        }
        return true;
      },
    },
  ];
  const { desc } = await inquirer.prompt(question);
  return desc;
};

const listPlaces = async (places = []) => {
  const choices = places.map((place, index) => {
    const idx = `${index + 1}. `.green;
    return {
      value: place.id,
      name: `${idx} ${place.name}`,
    };
  });
  const question = [
    {
      type: "list",
      name: "id",
      message: "Select place",
      choices,
    },
  ];
  choices.unshift({
    value: "0",
    name: `${"0.".green} cancel`,
  });
  const { id } = await inquirer.prompt(question);
  return id;
};
const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

const showListCheck = async (tasks = []) => {
  const choices = tasks.map((task, index) => {
    const idx = `${index + 1}. `.green;
    return {
      value: task.id,
      name: `${idx} ${task.desc}`,
      checked: task.completeIn ? true : false,
    };
  });

  const question = [
    {
      type: "checkbox",
      name: "ids",
      message: "selections",
      choices,
    },
  ];
  const { ids } = await inquirer.prompt(question);
  return ids;
};

module.exports = {
  inquirerMenu,
  pause,
  readInput,
  listPlaces,
  confirm,
  showListCheck,
};
