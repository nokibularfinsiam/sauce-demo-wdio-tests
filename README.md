# SauceDemo WebdriverIO Test Suite

This repository contains an automated test suite for [SauceDemo](https://www.saucedemo.com/) built with **WebdriverIO**, **Mocha**, and **Allure Reporter**. You can run tests individually or all together, and generate detailed Allure reports after each execution.

---

## Prerequisites

Before you begin, ensure you have installed:

* **Node.js** (v14 or higher)
* **npm** (comes with Node.js)
* **Git** (for cloning the repository)
* **Allure Commandline** (for report generation)

---

## Clone GitHub

**Clone the repository**

```bash
git clone https://github.com/nokibularfinsiam/sauce-demo-wdio-tests.git
```

## Install WebdriverIO
````
npm init wdio@latest .
````
```
✔ A project named "sauce-demo-wdio-tests" was detected at "D:\Siam\SQA\sauce-demo-wdio-tests", correct? yes
✔ What type of testing would you like to do? E2E Testing - of Web or Mobile Applications
✔ Where is your automation backend located? On my local machine
✔ Which environment you would like to automate? Web - web applications in the browser
✔ With which browser should we start? Chrome
✔ Which framework do you want to use? Mocha (https://mochajs.org/)
✔ Do you want to use Typescript to write tests? no
✔ Do you want WebdriverIO to autogenerate some test files? yes
✔ What should be the location of your spec files? D:\Siam\SQA\sauce-demo-wdio-tests\test\specs\**\*.js
✔ Do you want to use page objects (https://martinfowler.com/bliki/PageObject.html)?
✔ Where are your page objects located? D:\Siam\SQA\sauce-demo-wdio-tests\test\pageobjects\**\*.js
✔ Which reporter do you want to use? allure
✔ Do you want to add a plugin to your test setup?
✔ Would you like to include Visual Testing to your setup? For more information see https://webdriver.io/docs/visual-testing! yes
✔ Do you want to add a service to your test setup? 
✔ Do you want me to run `npm install`? yes
```

````
npm install
````
The key settings in `wdio.conf.js` include:

* **Runner**: Local
* **Framework**: Mocha
* **Services**: ChromeDriver
* **Reporters**: `allure`
* **Timeouts**: 10s for commands; 60s for Mocha tests

You can adjust these settings to suit your environment.

### Install Allure Reporter

```bash
npm install @wdio/allure-reporter --save-dev
```

### Add into package.json

```bash
  "scripts": {
    "wdio": "wdio run ./wdio.conf.js",
    "test": "wdio run wdio.conf.js",
    "allureReport": "allure generate allure-results --clean && allure open"
  }
```

## WebdriverIO Configuration

The key settings in `wdio.conf.js` include:
```bash
 baseUrl: 'https://www.saucedemo.com/',
```

## Adding Allure Reporting

The WebdriverIO Allure reporter is configured in `wdio.conf.js`:
```js
     reporters: [
        'spec',
        ['allure', {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false
        }]
    ],
```
* **`outputDir`**: Directory where test results are stored.
* **`disableWebdriverStepsReporting`**: Hides WebdriverIO internal steps to focus on test logic.
* **`disableWebdriverScreenshotsReporting`**: Enables screenshots on failure.

## Project Structure

```
├── test/
│   └── specs/
│       ├── lockedOutUser.spec.js
│       ├── standardUserFlow.spec.js
│       └── performanceUserFlow.spec.js
├── .gitignore
├── package.json
├── wdio.conf.js
└── README.md
```

* **`test/specs/`**: Contains the three test scripts for each scenario.
* **`wdio.conf.js`**: WebdriverIO configuration file, enabling ChromeDriver and Allure.
* **`package.json`**: Lists dependencies and NPM scripts.
* **`.gitignore`**: Excludes `node_modules/` and `allure-results/`.

---

## Running Tests

### Run All Tests

To execute **all** specs in sequence:

```bash
npm test
```

This runs:

```bash
wdio run wdio.conf.js
```

### Run a Single Spec

To run a specific test file, use the `--spec` flag:

```bash
npx wdio run wdio.conf.js --spec ./test/specs/lockedOutUser.spec.js
```

Or via npm:

```bash
npm test -- --spec ./test/specs/standardUser.spec.js
```

---

## Generating and Viewing Allure Reports

After test execution, generate and view the Allure report:

```bash
npm run allureReport
```

This script runs:

```bash
npx allure generate allure-results --clean && npx allure open
```

* **`--clean`**: Removes old results before generating a fresh report.
* **`allure open`**: Launches a local web server to view the report.

---

## License

This project is licensed under the [NOKIBUL ARFIN SIAM](https://github.com/nokibularfinsiam).
