const common = [
  '--require features/step_definitions/*.js', //Loads all the step definitions
  '--require features/pages/*.js', //Includes page objects
  '--format progress', //Shows execution progress in terminal
  '--format json:reports/cucumber_report.json', // JSON report for Cucumber HTML Reporter
].join(' ');

module.exports = {
  default: common,
  smoke: `${common} --tags '@SmokeTest'`,
  all: `${common} --tags '@AllTests'`
};