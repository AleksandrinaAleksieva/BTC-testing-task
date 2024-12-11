const common = [
  '--require features/step_definitions/*.js', //Loads all the step definitions
  '--require features/pages/*.js', //Includes page objects
  '--format progress', //Shows execution progress in terminal
  '--format json:reports/allure-results/cucumber_report.json', //Allure reporting
  '--format message:reports/allure-results/messages.ndjson', //Use message formatter
].join(' ');

module.exports = {
  default: common,
  smoke: `${common} --tags '@SmokeTest'`,
  all: `${common} --tags '@AllTests'`
};