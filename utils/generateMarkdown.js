const fetch = require("node-fetch");

// const licenseArr2 = [];

// // API calls to Github returning the license description, key, and URL
// const licenseData = async () => {
//   fetch("https://api.github.com/licenses")
//     .then((response) => response.json())
//     .then((data) => {
//       for (let i = 0; i < data.length; i++) {
//         const licenseUrl = data[i].url
//         fetch(`${licenseUrl}`)
//           .then((response) => response.json())
//           .then((data) => {
//             licenseDesc = {
//               licenseKey: data.key,
//               licenseDesc: data.description,
//               html_url: data.html_url,
//               licenseName: data.name
//             }
//             licenseArr2.push(licenseDesc)
//           })
//       }
//     })
//     .catch((err) => console.log(err))

// };


// // // TODO: Create a function that returns a license badge based on which license is passed in
// // // If there is no license, return an empty string
// function renderLicenseBadge(Answers) {
//   const licenseBadge = Answers.licenseKey.replace('-', ' ');
//   return `![license badge](https://img.shields.io/badge/License-${encodeURIComponent(licenseBadge)}-blue)`
// };
// // // TODO: Create a function that returns the license link
// // // If there is no license, return an empty string
// function renderLicenseLink(Answers) {
//   return `[License Link](${Answers.html_url})`
// };
// // // TODO: Create a function that returns the license section of README
// // // If there is no license, return an empty string
// function renderLicenseSection(Answers) {
//   return `## [License](#license) ![license badge](https://img.shields.io/badge/License-${encodeURIComponent(licenseBadge)}-blue) \
// ${Answers.licenseDesc}`
// };

// function renderContributor(Answers) {
// for (let index = 0; index < Answers.authors.length; index++) {
//   const developer = Answers.developer[index].developer;
//   const githubId = Answers.developer[index].githubId;
//   const email = Answers.developer[index].email;
//   }
// }

// TODO: Create a function to generate markdown for README
function generateMarkdown(Answers) {
  // licenseBadge = renderLicenseBadge(Answers);
  // licenseLink = renderLicenseLink(Answers);
  // licenseSection = renderLicenseSection(Answers);

  if ((Answers.licenseX) === 'None') {
    return `# [${Answers.title}](#title)
## [Description](#description)
${Answers.description}
>> - Deployed Project URL: ${Answers.deployedLink}
>> - Project Repository URL: ${Answers.repoLink}
## Table of Contents
> * [Title](#title)
> * [Description](#description)
> * [Contributing](#contributing)
> * [Installation](#installation) 
> * [Usage](#usage)
> * [Tests](#tests)
> * [Questions](#questions)
## [Contributing](#contributing)
## [Installation](#installation)
${Answers.installation}
## [Usage](#usage)

## [Tests](#tests)
## [Questions](#questions)
Please feel free to use the contact information below for any project questions
`} else
    return `# [${Answers.title}](#title)
## [Description](#description)
${Answers.description}
>> - Deployed Project URL: ${Answers.deployedLink}
>> - Project Repository URL: ${Answers.repoLink}
## Table of Contents
> * [Title](#title)
> * [Description](#description)
> * [Contributing](#contributing)
> * [Installation](#installation) 
> * [Usage](#usage)
> * [Tests](#tests)
> * [Questions](#questions)
## [Contributing](#contributing)
## [Installation](#installation)
${Answers.installation}
## [Usage](#usage)

## [Tests](#tests)
## [Questions](#questions)
Please feel free to use the contact information below for any project questions
`
}

module.exports = generateMarkdown;