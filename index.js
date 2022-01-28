// TODO: Include packages needed for this application
const writeToFile = require('fs');
const inquirer = require('inquirer');
const fetch = require("node-fetch");
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
// Introduction, optional sections, and project details questions
const init = () => {
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
const projectAuthors = Answers => {
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
            choices: await licenses(),
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
        },
        {
            type: 'confirm',
            name: 'installPicsConfirm',
            message: 'Do you want do includes installation example pictures or videos in your installation instructions?',
            default: false
        }
    ]
    return inquirer.prompt(questions)
        .then((data) => {
            Answers = { ...Answers, ...data }
            return Answers;
        })
}

//install pictures (Optional)
const installPics = Answers => {
    if (Answers.installPicsConfirm) {
        if (!Answers.iPics) {
            Answers.iPics = [];
        }
        questions = [
            {
                type: 'input',
                name: 'iPicDesc',
                message: `Please provide a brief desc of the install pic. (required)`,
                validate: ipicDesc => {
                    if (ipicDesc) {
                        return true;
                    } else {
                        console.log('Please enter a brief desc of the install pic. (required)');
                        return false;
                    }
                }
            },
            {
                type: 'input',
                name: 'iPicLoc',
                message: `Please the location and name of the picture file. (required) -- Example: ./assets/pictures/pic1.png`,
                validate: ipicDesc => {
                    if (ipicDesc) {
                        return true;
                    } else {
                        console.log('A file location and name is required. Please provide location and name of the picture file. (required) -- Example ./assets/pictures/pic1.png');
                        return false;
                    }
                }
            },
            {
                type: 'confirm',
                name: 'iPicsConfirm',
                message: 'Do you want do include more example pictures or videos in your installation instructions?',
                default: false
            }
        ]
        return inquirer.prompt(questions)
            .then((data) => {
                inst_Pics = {
                    iPicDesc: data.iPicDesc,
                    iPicLoc: data.iPicLoc
                }
                Answers.iPics.push(inst_Pics);
                if (data.iPicsConfirm) {
                    return installPics(Answers);
                } else {
                    return Answers;
                }
            })
    }
    else return Answers;
};


// API call to github returning a list of licenses
const licenses = async () => {
    const licenseArr = ['None',]
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const licenseName = data[i].name
                licenseArr.push(licenseName)
            }
        })
        .catch((err) => console.log(err))
    return licenseArr
};

// API calls to Github returning the license description, key, and URL
const licenseUrl = async Answers => {
    if (Answers.licenseX = 'None') {
        licenseDesc = {
            licenseKey: Answers.licenseX,
            licenseDesc: Answers.licenseX,
            html_url: Answers.licenseX
        };
        Answers = { ...Answers, ...licenseDesc };
        console.log(Answers);
        return generateMarkdown(Answers);
    } else
        licenseX = Answers.licenseX
    fetch("https://api.github.com/licenses")
        .then((response) => response.json())
        .then((data) => {
            for (let i = 0; i < data.length; i++) {
                const licenseName = data[i].name
                const licenseUrl = data[i].url
                {
                    if (licenseName === licenseX) {
                        fetch(`${licenseUrl}`)
                            .then((response) => response.json())
                            .then((data) => {
                                licenseDesc = {
                                    licenseKey: data.key,
                                    licenseDesc: data.description,
                                    html_url: data.html_url
                                };
                                Answers = { ...Answers, ...licenseDesc };
                                console.log(Answers);
                                return generateMarkdown(Answers);
                            })

                    }
                }
            }
        })
        .catch((err) => console.log(err))
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
init()
    .then(Answers => { return projectAuthors(Answers) })
    .then(projectResources)
    .then(projectInstruct)
    .then(installPics)
    .then(licenseUrl)
// await .then(Answers => { return generateMarkdown(Answers) })

