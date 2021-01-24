Team Profile Generator
====

# Description
This app uses a simple CLI that will dynamically create cards of a team's members based on their classes. For the purposes of this project the classes were pre-defined as "Engineer", "Intern" and "Manager"

----

# Code
Initially a parent class was created.

```
class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;
    }

    getName() {
        return this.name
    };
    getId() {
        return this.id
    };
    getEmail() {
        return this.email
    };
    getRole() {
        return "Employee"
    };
}

module.exports = Employee
```
Then friend classes that inherited information from the parent class were created to reflect their class titeles and information "Engineer", "Intern" and "Manager".

```var Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github;
    }
    getGithub(){
        return this.github;
    }
    
    getRole() {
        return "Engineer";
    };
}

module.exports = Engineer
```
For example, here is the Engineer class. As you can see, using the "super" the class is able to inherit the parameters of the parent class and we are still able to add new information unique to this class. In this case it is a github username and a function that returns that username.

To get the app to work, Inquirer.js was used.
```
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
```
In this code we can see initially a prompt is asked to choose the class that we will be asking questions about. When that class is chosen in the CLI it then prompts with the pertinent questions about that class and then the object data is pushed into an array. At the end of the questioning it asks if you want to continue creating your team. If one wishes to stop populating their team then it will write the data onto a new html file, here titled "team.html".


# Installation
In order to use the Team Profile Generator once you've cloned down the repository simple do an 'npm install' to fetch the dependencies and you'll be ready to initialize the app by typing 'node app.js' into your terminal.

If you wish to refactor the information about the classes this can be done in the "lib" directory. Changes to each class should also reflect the questions asked about them in the 'app.js' file.

----

# Project Link
[Project Sample Page](https://spenrad.github.io/Team-Profile-Generator/) <br>
[Project Repository](https://github.com/spenrad/Team-Profile-Generator) <br>
[Video Demonstration](https://drive.google.com/file/d/1XeDnpPDt20iImqUwwxM3uEc1BWUT8YgN/view?usp=sharing)

----

# Author
Spencer Christy<br>
[GitHub](https://github.com/spenrad)<br>
[LinkedIn](https://www.linkedin.com/in/spencer-christy-543b84b3/)<br>

----
