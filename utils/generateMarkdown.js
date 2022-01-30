const fetch = require("node-fetch");
const stripchar = require('stripchar').StripChar;

// // // TODO: Create a function that returns a license badge based on which license is passed in
// // // If there is no license, return an empty string
function renderLicenseBadge(licenseKeys) {
  var licenseBadge = stripchar.RSspecChar(`${licenseKeys}`, `--`);
  return `![license badge](https://img.shields.io/badge/License-${licenseBadge}-blue)`
};
// // // TODO: Create a function that returns the license link
// // // If there is no license, return an empty string
function renderLicenseLink(licenseDetails) {
  var licenseWeb = licenseDetails.map(({ html_url }) => html_url);
  return `[License Link](${licenseWeb})`
};
// // // TODO: Create a function that returns the license section of README
// // // If there is no license, return an empty string
function renderLicenseSection(licenseDetails) {
  var licenseDescript = licenseDetails.map(({ licenseDesc }) => licenseDesc);
  return `## [License](#license)
  
  >> ${licenseDescript}`
};

// function renderContributor(Answers) {
// for (let index = 0; index < Answers.authors.length; index++) {
//   const developer = Answers.developer[index].developer;
//   const githubId = Answers.developer[index].githubId;
//   const email = Answers.developer[index].email;
//   }
// }

// TODO: Create a function to generate markdown for README
function generateMarkdown(Answers, licenseArr3) {
  licenseDetails = licenseArr3.filter(function (el) { return el.licenseName == Answers.licenseX });
  licenseKeys = licenseDetails.map(({ licenseKey }) => licenseKey)
  licenseBadging = renderLicenseBadge(licenseKeys);
  licenseLink = renderLicenseLink(licenseDetails);
  licenseSection = renderLicenseSection(licenseDetails);

  // const licenseVal = licenseLinx.map(({ licenseUrl }) => licenseUrl);

  // console.log(Answers);
  // console.log(licenseDetails);

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
${Answers.usage}

## [Tests](#tests)
${Answers.test}

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
> * [license](#license) ${licenseBadging}
> * [Usage](#usage)
> * [Tests](#tests)
> * [Questions](#questions)

## [Contributing](#contributing)

## [Installation](#installation)
>> ${Answers.installation}

${licenseSection}
>> ${licenseLink}

## [Usage](#usage)
   ${Answers.usage}

## [Tests](#tests)
   ${Answers.test}

## [Questions](#questions)
Please feel free to use the contact information below for any project questions.

`
}

module.exports = generateMarkdown;