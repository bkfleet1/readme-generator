// Packages needed for this application
const { NONAME } = require('dns');
const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require(`node-fetch`);
const generateMarkdown = require('./utils/generateMarkdown');

// licensing data Arrays populated by Init() and licenseData()
const licenseArr = ['None']
const licenseArr3 = [{ licenseKey: `None`, licenseDesc: `None`, html_url: `None` }];

// API call to github returning a list of licenses
const init = async () => {
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const licenseName = data[i].name
                licenseArr.push(licenseName)
            }
        })
        .catch((err) => console.log(err))
};

// API calls to Github returning the license description, key, and URL
function licenseData() {
  fetch("https://api.github.com/licenses")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const licenseUrl = data[i].url
        fetch(`${licenseUrl}`)
          .then((response) => response.json())
          .then((data) => {
            licenseDesc = {
              licenseKey: data.spdx_id,
              licenseDesc: data.description,
              html_url: data.html_url,
              licenseName: data.name
            }
            licenseArr3.push(licenseDesc)
          })
      }
    })
    .catch((err) => console.log(err))

};

// project questions using Inquirer
const projectInit = () => {
    console.log(`
===============================
Welcome to the Readme Generator
===============================
Readme Genereator is a command-line application that dynamically generates a project README.md file based on your responses to a series of questions(e.g, Project Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions).
`);

    const questions = [
        {
            type: 'input',
            name: 'title',
            message: 'What is the name of the project? (Required)',
            validate: title => {
                if (title) {
                    return true;
                } else {
                    console.log('A project name is required. Please enter the name of the project.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Please provide a short description of your project. (Required)',
            validate: description => {
                if (description) {
                    return true;
                } else {
                    console.log('A project description is required. Please provide a short description of your project.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'repoLink',
            message: 'Enter the url to the project Github repository. (Required)',
            validate: repoLink => {
                if (repoLink) {
                    return true;
                } else {
                    console.log('Please enter the url to the project Github repository.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'deployedLink',
            message: 'Enter the url to the deployed project on Github. (Required)',
            validate: deployedLink => {
                if (deployedLink) {
                    return true;
                } else {
                    console.log('Please enter the url to the deployed project on Github');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'developer',
            message: `Enter name of the project's developer. (Required)`,
            validate: developer => {
                if (developer) {
                    return true
                } else {
                    console.log(`Please enter name of the project's developer.`);
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'githubId',
            message: `What is the developer's Github Id? (Required)`,
            validate: githubId => {
                if (githubId) {
                    return true
                } else {
                    console.log(`A Github Id is required. Please enter the developer's Github Id`);
                    return false
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: `Please provide an email address for support questions? (Required)`,
            validate: email => {
                if (email) {
                    return true
                } else {
                    console.log(`An email address is required for support. Please provide an email address for support questions`);
                    return false
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What development languages and libraries were used to create this project? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'jQuery', 'Bootstrap', 'Node', 'Inquirer'],
            validate: languages => {
                if (languages) {
                    return true;
                } else {
                    console.log('Please select the development languages and libraries used to create this project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'installation',
            message: `Please enter the install instructions for the project. (Required)`,
            validate: installation => {
                if (installation) {
                    return true;
                } else {
                    console.log('Please enter installation instructions for the project');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'usage',
            message: `Please enter any usage information related to the project. (Required)`,
            validate: usage => {
                if (usage) {
                    return true;
                } else {
                    console.log('Please enter any usage information related to the project.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'test',
            message: `Please any testing resources available for the project. (Required)`,
            validate: usage => {
                if (usage) {
                    return true;
                } else {
                    console.log('Please enter any usage information related to the project.');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'licenseX',
            message: 'Please select a license for this project. Choose "None" if a license does not apply. (Required)',
            choices: licenseArr,
            validate: licenseX => {
                if (licenseX) {
                    return true;
                } else {
                    console.log('A license choice is requiredt. Please choose "None" if a license does not apply.');
                    return false;
                }
            }
        }
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            Answers = data
            return Answers;
        })
}


//Creates the README file
const writeToFile = data => {
    fs.writeFileSync('./dist/README.md', data)
};

// Initializes the app
init()
    .then(licenseData)
    .then(projectInit)
    .then(Answers => { return generateMarkdown(Answers,licenseArr3) })
    .then(writeToFile)

