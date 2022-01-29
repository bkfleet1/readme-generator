// TODO: Include packages needed for this application
const { NONAME } = require('dns');
const fs = require('fs');
const inquirer = require('inquirer');
const fetch = require(`node-fetch`);
const generateMarkdown = require('./utils/generateMarkdown');
// const licenseData = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
// Introduction, optional sections, and project details questions

const licenseArr = ['None']
// const licenseArr2 = [{ licenseName: 'None', licenseUrl: 'None' }]


// API call to github returning a list of licenses
const init = async () => {
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const licenseName = data[i].name
                // const licenseUrl = data[i].url
                // const licenseNames = {
                //     licenseName: licenseName,
                //     licenseUrl: licenseUrl
                // }
                licenseArr.push(licenseName)
                // licenseArr2.push(licenseNames)
            }
        })
        .catch((err) => console.log(err))
        // return licenseArr2
};

// // API calls to Github returning the license description, key, and URL
const licenseArr3 = [{ licenseKey: `None`, licenseDesc: `None`, html_url: `None` }];

// // API calls to Github returning the license description, key, and URL
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
              licenseKey: data.key,
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
        }
    ]
    return inquirer.prompt(questions)
        .then(Answers => {
            return Answers;
        })
};


// project developer information. Additional developers allowed.
const projectAuthors = (Answers) => {
    if (!Answers.authors) {
        Answers.authors = [];
    }
    questions = [
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
            message: `What is the developer's email address? (Required)`,
            validate: email => {
                if (email) {
                    return true
                } else {
                    console.log(`An email address is required. Please enter the developer's email address`);
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
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            author = {
                developer: data.developer,
                githubId: data.githubId,
                email: data.email
            };
            Answers.authors.push(author)
            if (data.developers) {
                return projectAuthors(Answers);
            } else
                return Answers;

        })
};



// Resources utilized in the development of the project. Additional resources not provided can included (Optional)
const projectResources = async Answers => {
    questions = [
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
            message: `Are there development languages and libraries that were used in this project?`,
            default: false
        },
        {
            type: 'input',
            name: 'languagesOther',
            message: `Please enter other development languages and libraries used in this project not previously cited, separating each with a comma.`,
            when: ({ languagesConfirm }) => {
                if (languagesConfirm) {
                    return true
                } else {
                    return false
                }
            }
        },
        {
            type: 'list',
            name: 'licenseX',
            message: 'Please select the license that applies to this project? (Required)',
            choices: licenseArr,
            validate: licenseX => {
                if (licenseX) {
                    return true;
                } else {
                    console.log('Please select the license that applies to this project? (Required)');
                    return false;
                }
            }
        }
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            let langs = data.languages + ',' + data.languagesOther;
            let langLic1 = {
                languages: langs,
                licenseX: data.licenseX
            };
            let langLic2 = {
                languages: data.languages,
                licenseX: data.licenseX
            };
            if (data.languagesConfirm) {
                Answers = { ...Answers, ...langLic1 }
                return Answers;
            }
            else
                Answers = { ...Answers, ...langLic2 }
            return Answers;
        })
};

//project instructions
const projectInstruct = Answers => {
    questions = [
        {
            type: 'input',
            name: 'usage',
            message: `Please enter any usage informations related to the project. (Required)`,
            validate: usage => {
                if (usage) {
                    return true;
                } else {
                    console.log('Please enter any usage informations related to the project.');
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
                    console.log('Please enter any usage informations related to the project.');
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
        }
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            Answers = { ...Answers, ...data }
            return Answers;
        })
}







// // TODO: Create a function to write README file
const writeToFile = data => {
    //     //     // return new Promise((resolve, reject) => {
    console.log((data))
    fs.writeFileSync('./dist/README.md', data)
    // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
    // if (err) {
    //   reject(err);
    //   // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
    //   return;
    // }

    // // if everything went well, resolve the Promise and send the successful data to the `.then()` method
    // resolve({
    //   ok: true,
    //   message: 'File created!'
    // });
    //   });
    // });
};

// TODO: Create a function to initialize app
init()
    .then(licenseData)
    .then(projectInit)
    .then(Answers => { return projectAuthors(Answers) })
    .then(Answers => { return projectResources(Answers) })
    .then(Answers => { return projectInstruct (Answers) })
    .then(Answers => { return generateMarkdown(Answers,licenseArr3) })
    // .then(writeToFile)

