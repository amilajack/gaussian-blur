/* eslint-disable */
const path = require('path');
const createTestCafe = require('testcafe');

if (!process.env.CI) {
  require('dotenv').config();
}

let testcafe = null;

createTestCafe('localhost', 1337, 1338)
  .then(tc => {
    testcafe = tc;
    const runner = testcafe.createRunner();
    return runner
      .src(path.join(__dirname, 'e2e/*.e2e.js'))
      .browsers('saucelabs:Chrome')
      .run();
  })
  .then(failedCount => {
    console.log('Tests failed: ' + failedCount);
    testcafe.close();
    if (failedCount) {
      process.exit(1);
    }
  });
