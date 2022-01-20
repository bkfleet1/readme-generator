// TODO: Include packages needed for this application
const writeToFile = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const projectDetails = detailsAnswers => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: '(Required) What is the name of the project?',
            validate: titleInput => {
                if (titleInput) {
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
            message: '(Required) Please provide a short description of your project. NOTE: A description should include (1. Why was this project created? (2. What problem does it solve? (3. How does it solve the problem?',
            validate: descriptionInput => {
                if (descriptionInput) {
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
            message: '(Required) Enter the url to the project Github repository.',
            validate: repoLinkInput => {
                if (repoLinkInput) {
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
            message: '(Required) Enter the url to the deployed project on Github.',
            validate: deployedLinkInput => {
                if (deployedLinkInput) {
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
    if (!authorsAnswers.developerInput) {
        authorsAnswers.developerInput = [];
    }
    return inquirer.prompt([
        {
            type: 'input',
            name: 'developer',
            message: `(Required) Enter name of the project's developer.`,
            validate: developerInput => {
                if (developerInput) {
                    return true;
                } else {
                    console.log(`Please enter name of the project's developer.`);
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'developers',
            message: `Are there other developers that you'd like to cite as contributors to the project?`,
            default: false,
            when: ({ developers }) => {
                if (developers) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ])
        .then(authorsAnswers => {
            authorsAnswers.developerInput.push(authorsAnswers);
            if (authorsAnswers.developers) {
                return projectAuthors(authorsAnswers);
            } else {
                return authorsAnswers;
            }
        });
    };



//if we wanted to add a Other choice and allow a user to enter languages not listed?
// {
//     type: 'checkbox',
//         name: 'languages',
//             message: 'What development languages and libraries were used to create this project? (Check all that apply)',
//                 choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node', 'Inquirer'],
//                     validate: languagesCheckbox => {
//                         if (languagesCheckbox) {
//                             console.log(languagesCheckbox);
//                             return true;
//                         } else {
//                             console.log('Please select the development languages and libraries used to create this project!');
//                             return false;
//                         }
//                     }
// }


 
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
//     npm install inquirer
// }

// Function call to initialize app
init()
    .then(projectDetails)
    .then(projectAuthors)
    .then(projectResources)
    .then(data => {
        return generateMarkdown(data)
    })
    .then(writeToFile => {
        return writeFile(writeToFile)
    })
