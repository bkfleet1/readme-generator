// TODO: Include packages needed for this application
// const writeToFile = require('fs');
const inquirer = require('inquirer');
// const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
// Introduction, optional sections, and project details questions
const projectDetails = detailsAnswers => {
    console.log(`
===============================
Welcome to the Readme Generator
===============================

Readme Genereator is a command-line application that dynamically generates a project README.md file based on your responses to a series of questions(e.g, project name, title, repository url, deployed url, developer names, install instructions, usage, licensing, and credits).

There are also optional sections, such as Badges, Features, Contributor Covenants, and Testing Instructions.
`);



    return inquirer.prompt([
        {
            type: 'confirm',
            name: 'optionalConfirm',
            message: 'Do you want to include any optional sections in your README.md (e.g.,Badges, Features, Contributor Covenants, or Testing Instructions.)?'
        },
        {
            type: 'checkbox',
            name: 'optional',
            message: 'Which optional sections do you want to include in your README.md? (Check all that apply)',
            choices: ['Badges', 'Features', 'Contributor Covenants', 'Testing Instructions'],
            when: ({ optionalConfirm }) => {
                if (optionalConfirm) {
                    return true
                } else {
                    return false
                }
            }
        },
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
        }
    ])
};

const projectAuthors = authorsAnswers => {
    if (!authorsAnswers.developer) {
        authorsAnswers.developer = [];
      }
    return inquirer.prompt([
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
            type: 'confirm',
            name: 'developers',
            message: `Are there other developers that you'd like to cite as contributors to the project?`,
            default: false
        }
    ])
    .then(coders => {
        authorsAnswers.developer.push(coders);
        if (coders.developers) {
            return projectAuthors(authorsAnswers);
        } else {
            // console.log(authorsAnswers.developer);
            return authorsAnswers.developer;
        }
    })
};



//if we wanted to add a Other choice and allow a user to enter languages not listed?
const projectResources = resourcesAnswers => {
    if (!resourcesAnswers) {
        resourcesAnswers = [];
    }
    return inquirer.prompt([
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What development languages and libraries were used to create this project? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node', 'Inquirer'],
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
            type: 'confirm',
            name: 'languagesConfirm',
            message: `Are there development languages and libraries that were used in this project?`
        },
        {
            type: 'input',
            name: 'languagesOther',
            message: `Please enter other development languages and libraries used in this project not previously cited, separating each with a comma.`,
            when: ({ languagesConfirm }) => {
                if (languagesConfirm) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
};



// // TODO: Create a function to write README file
// function  writeToFile = fileContent => {
//     return new Promise((resolve, reject) => {
//       fs.writeFile('./dist/README.md', fileContent, err => {
//         // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
//         if (err) {
//           reject(err);
//           // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
//           return;
//         }

//         // if everything went well, resolve the Promise and send the successful data to the `.then()` method
//         resolve({
//           ok: true,
//           message: 'File created!'
//         });
//       });
//     });
//   };

// TODO: Create a function to initialize app
// function init() {
//     $ ('npm install inquirer')
// }

// Function call to initialize app
// init()
// .then(projectDetails)
projectDetails()
    .then(projectAuthors)
    .then(projectResources)


            // .then(data => {
            //     return generateMarkdown(data)
            // })
            // .then(writeToFile => {
            //     return writeFile(writeToFile)
            // })
