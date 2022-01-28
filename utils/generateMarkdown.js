// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) { }

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) { }

https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) { }

// function renderContributor(Answers) {
// for (let index = 0; index < Answers.authors.length; index++) {
//   const developer = Answers.developer[index].developer;
//   const githubId = Answers.developer[index].githubId;
//   const email = Answers.developer[index].email;
//   }
// }

// TODO: Create a function to generate markdown for README
const generateMarkdown = Answers => {
  const licenseBadge = Answers.licenseKey.replace('-',' ');
  console.log(licenseBadge); 


  console.log(`# [${Answers.title}](#title)

  ## [Description](#description)
  ${Answers.description}

  >> - Deployed Project URL: ${Answers.deployedLink}
  >> - Project Repository URL: ${Answers.repoLink}

  ## Table of Contents
  > * [Title](#title)
  > * [Description](#description)
  > * [Contributing](#contributing)
  > * [Installation](#installation) ![license badge](https://img.shields.io/badge/License-${encodeURIComponent(licenseBadge)}-blue)
  > * [Usage](#usage)
  > * [License](#license)
  > * [Tests](#tests)
  > * [Questions](#questions)

  ## [Contributing](#contributing)

  ## [Installation](#installation)
  ${Answers.installation}

  ## [Usage](#usage)

  ## [License](#license)
  ${Answers.licenseDesc}
  Full License: ${Answers.html_url}

  ## [Tests](#tests)


  ## [Questions](#questions)
  Please feel free to use the contact information below for any project questions

`)
}

module.exports = generateMarkdown;
