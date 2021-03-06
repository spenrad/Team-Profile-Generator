const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

var engineerQs = [
    {
      type: "input",
      name: "name",
      message: "What is your Engineer's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your Engineer's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your Engineer's ID e-mail address?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your Engineer's GitHub username?",
    },
  ];
  
var managerQs = [
    {
      type: "input",
      name: "name",
      message: "What is your Manager's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your Manager's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your Manager's ID e-mail address?",
    },
    {
      type: "input",
      name: "officeNumber",
      message: "What is your Manager's office number?",
    },
  ];
  
var internQs = [
    {
      type: "input",
      name: "name",
      message: "What is your Intern's name?",
    },
    {
      type: "input",
      name: "id",
      message: "What is your Intern's ID number?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your Intern's ID e-mail address?",
    },
    {
      type: "input",
      name: "school",
      message: "What is your Intern's school?",
    },
  ];

var classQ = [
    {
      type: "list",
      name: "class",
      message: "Which type of emloyee are you inputting data for?",
      choices: ["Engineer", "Intern", "Manager"],
    }
  ];
  
var terminate = [
    {
      type: "confirm",
      name: "cont",
      message: "Add another employee?",
    }
  ];

var team = [];

async function askQs() {
    const answers = await inquirer.prompt(classQ);
    if (answers.class === "Engineer") {
      const engineer = await inquirer.prompt(engineerQs);
        let engineerObj = new Engineer(
        engineer.name,
        engineer.id,
        engineer.email,
        engineer.github
      );
      team.push(engineerObj);
    } else if (answers.class === "Intern") {
      const intern = await inquirer.prompt(internQs);
        let internObj = new Intern(
        intern.name,
        intern.id,
        intern.email,
        intern.school
      );
      team.push(internObj);
    } else {
       const manager = await inquirer.prompt(managerQs);
        let managerObj = new Manager(
        manager.name,
        manager.id,
        manager.email,
        manager.officeNumber
      );
      team.push(managerObj);
    }
  
    const finalAnswer = await inquirer.prompt(terminate);
    if (finalAnswer.cont == true) {
      askQs();
    } else {
      console.log(team);
  
      var data = render(team);
      writeToFile("team.html", data);
    }
}

askQs();

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
  });
}

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
