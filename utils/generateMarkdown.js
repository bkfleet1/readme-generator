const fetch = require("node-fetch");
const stripchar = require('stripchar').StripChar;

//Creates a function that returns a license badge based on which license is passed in
function renderLicenseBadge(licenseKeys) {
  const licenseBadge = stripchar.RSspecChar(`${licenseKeys}`, `--`);
  return `![license badge](https://img.shields.io/badge/License-${licenseBadge}-blue)`
};

// Creates a function that returns the license link
function renderLicenseLink(licenseDetails) {
  const licenseWeb = licenseDetails.map(({ html_url }) => html_url);
  return `[License Link](${licenseWeb})`
};
// Creates a function that returns the license section of README
function renderLicenseSection(licenseDetails,Answers) {
  const licenseDescript = licenseDetails.map(({ licenseDesc }) => licenseDesc);
  return `## [License](#license)
  ${Answers.licenseX}
  ${licenseDescript}`
};


// Generates markdown for README
function generateMarkdown(Answers, licenseArr3) {
const licenseDetails = licenseArr3.filter(function (el) { return el.licenseName == Answers.licenseX });
const licenseKeys = licenseDetails.map(({ licenseKey }) => licenseKey)
const licenseBadging = renderLicenseBadge(licenseKeys);
const licenseLink = renderLicenseLink(licenseDetails);
const licenseSection = renderLicenseSection(licenseDetails,Answers);

  console.log(Answers);
  console.log(licenseDetails);

 if ((Answers.licenseX) === 'None') {
    return `# [${Answers.title}](#title)

## [Description](#description)
${Answers.description}
>> - Deployed Project URL: ${Answers.deployedLink}
>> - Project Repository URL: ${Answers.repoLink}

## Table of Contents
> * [Title](#title)
> * [Description](#description)
> * [Developer](#developer)
> * [Resources](#resources)
> * [Installation](#installation) 
> * [Usage](#usage)
> * [Tests](#tests)
> * [Questions](#questions)

## [Developer](#developer)
[${Answers.developer}](https://github.com/${Answers.githubId})

## [Resources](#resources)
The following resources were used in the development of this project.
${Answers.languages}

## [Installation](#installation)
${Answers.installation}

## [Usage](#usage)
${Answers.usage}

## [Tests](#tests)
${Answers.test}

## [Questions](#questions)
Please email [${Answers.email}](mailto:${Answers.email}) with any project questions.

`} else
    return `# [${Answers.title}](#title)

## [Description](#description)
   ${Answers.description}
>> - Deployed Project URL: ${Answers.deployedLink}
>> - Project Repository URL: ${Answers.repoLink}
${licenseBadging}

## Table of Contents
> * [Title](#title)
> * [Description](#description)
> * [Developer](#developer)
> * [Resources](#resources)
> * [Installation](#installation) 
> * [license](#license) 
> * [Usage](#usage)
> * [Tests](#tests)
> * [Questions](#questions)

## [Developer](#developer)
[${Answers.developer}](https://github.com/${Answers.githubId})

## [Resources](#resources)
The following resources were used in the development of this project.
${Answers.languages}

## [Installation](#installation)
${Answers.installation}

${licenseSection}
${licenseLink}

## [Usage](#usage)
${Answers.usage}

## [Tests](#tests)
${Answers.test}

## [Questions](#questions)
Please email [${Answers.email}](mailto:${Answers.email}) with any project questions.

`
}

module.exports = generateMarkdown;