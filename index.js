// TODO: Include packages needed for this application
const writeToFile = require('fs');
const inquirer = require('inquirer');
const fetch = require("node-fetch");
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
// Introduction, optional sections, and project details questions
const projectDetails = detailsAnswers => {
    if (!detailsAnswers) {
        detailsAnswers = [];
    }
    console.log(`
===============================
Welcome to the Readme Generator
===============================

Readme Genereator is a command-line application that dynamically generates a project README.md file based on your responses to a series of questions(e.g, Project Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions).

`);
    return inquirer.prompt([
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
        .then(data => {
            detailsAnswers.push(data)
            console.log(detailsAnswers)
            return detailsAnswers
        })
};

const projectAuthors = authorsAnswers => {
    // if (!authorsAnswers) {
    //     authorsAnswers = [];
    // }
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
            type: 'confirm',
            name: 'developers',
            message: `Are there other developers that you'd like to cite as contributors to the project?`,
            default: false
        }
    ])
        .then(data => {
            authorsAnswers.push(data);
            if (data.developers) {
                return projectAuthors(authorsAnswers);
            } else {
                console.log(authorsAnswers);
                return authorsAnswers;
            }
        })
};



//if we wanted to add a Other choice and allow a user to enter languages not listed?
const projectResources = async resourcesAnswers => {
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
        },
        {
            type: 'list',
            name: 'licenseX',
            message: 'Select a development license applies to this project? (Check all that apply)',
            choices: await licenses(),
            validate: licenseX => {
                if (licenseX) {
                    return true;
                } else {
                    console.log('Please select the development license that applies to this project!');
                    return false;
                }
            }
        }

    ])
        .then(data => {
            resourcesAnswers.push(data);
            console.log(resourcesAnswers);
            //   return resourcesAnswers
            licenseDesc(resourcesAnswers);
        })
};


const licenses = async () => {
    const licenseArr = []
 /
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const licenseName = data[i].name
                const licenseUrl = data[i].url
                // localStorage.setItem(licenseName,licenseUrl)
                licenseArr.push(licenseName)
                // licenseArr2.push(licenseName,licenseUrl)
            }
        })
        .catch((err) => console.log(err))
    return licenseArr
};

// const licenseDesc = (resourcesAnswers,licenseArr2) => {
//     console.log(licenseArr2);
//     console.log(resourcesAnswers);
    // for (let i = 0; i < resourcesAnswers.length; i++) {
    //     const licenseX = resourcesAnswers[i].licenseX;
    //     console.log(licenseX);
    //     {for (let index = 0; index < licenseArr2.length; index++) {
    //         const l_name = licenseArr2[index].licenseName;
    //         const l_url = licenseArr2[index].licenseUrl;
    //         if (l_name === licenseX) {
    //             console.log(l_url)} 
    //         }
            
    //     }
    // }
    // } 

const licenseDetails = (resourcesAnswers) => {
    console.log(resourcesAnswers);

    // fetch(`https://api.github.com/licenses/${licenseX}`)
    //     .then((response) => response.json())
    //     .then(data =>{
    //         licenseDesc.push(data);
    //         console.log(licenseDesc);
    //         return licenseDesc;
    //     })
    //     // .then((data) => ({
    //     //     licenseKey: data.key,
    //     //     licenseDesc: data.description
    //     //                  }))
    //     .catch((err) => console.log(err))
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

projectDetails()
    .then(projectAuthors)
    .then(projectResources)
    .then(licenses)
    .then(licenseDetails)
    // .then(generateMarkdown)

    // .then(data=>generateMarkdown({
    //     licenseDetails: licenseDetails(data.licenseX), ...data
    // }))



// .then(data => {
//     return generateMarkdown(data)
// })
// .then(writeToFile => {
//     return writeFile(writeToFile)
// })


// const licenses = function () {
//     $.ajax({
//         type: "GET",
//         url: "https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json",
//         async: true,
//         dataType: "json",
//         success: function (data) {
//             const licenseData = data.licenses;
//             for (let i = 0; i < licenseData.length; i++) {
//                 const licenseId = licenseData[i].licenseId;
//                 const licenseName = licenseData[i].name;
//                 console.log(licenseId, licenseName);
//             }
//         },
//         error: function (xhr, status, err) { },
//     });
// };


