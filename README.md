# SauceDemo WebdriverIO E2E Suite

This repository contains a WebdriverIO + Mocha test suite for [SauceDemo](https://www.saucedemo.com/). It uses a **Page Object Model** structure, runs tests sequentially, and generates an **Allure** report.

---

## Prerequisites

- **Node.js** (v14 or higher) and **npm**  
- **Git**  
- **Allure Commandline** (for report generation)  

> Install Allure CLI locally:  
> `npm install --save-dev allure-commandline`

---

## Installation

1. **Clone this repository**  
   ```bash
   git clone https://github.com/nokibularfinsiam/sauce-demo-wdio-tests.git
   cd sauce-demo-wdio-tests
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```

This installs all required WebdriverIO packages, ChromeDriver, and Allure.

---

## Project Structure

```
sauce-demo-wdio-tests/
├── allure-report
├── allure-results
├── test/
│   ├── pageobjects/
│   │   ├── login.page.js
│   │   ├── inventory.page.js
│   │   ├── cart.page.js
│   │   └── checkout.page.js
│   └── specs/
│       ├── lockedOutUser.spec.js
│       ├── standardUser.spec.js
│       └── performanceUser.spec.js
├── .gitignore
├── package.json
├── wdio.conf.js
└── README.md
```

- **`test/pageobjects/`**: Contains POM classes for each page.  
- **`test/specs/`**: Contains test scripts for each user scenario.  
- **`wdio.conf.js`**: WebdriverIO configuration (sequential execution and Allure setup).  
- **`package.json`**: Dependencies and scripts.

---

**`package.json`**

```js
"type": "commonjs" // change type

```

---

## WebdriverIO Configuration
**`wdio.conf.js`**

```js
exports.config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    maxInstances: 1,   // ensure everything runs sequentially
    capabilities: [{
        browserName: 'chrome'
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
}

```

---

## Execution Process

1. **Install dependencies** (see [Installation](#installation)).  
2. **Run all tests** (sequentially):  
   ```bash
   npm test
   ```
   - Equivalent to: `npx wdio run wdio.conf.js`  
3. **Run a single spec** (optional):  
   ```bash
   npx wdio run wdio.conf.js --spec ./test/specs/lockedOutUser.spec.js
   ```
   or:  
   ```bash
   npm test -- --spec ./test/specs/standardUser.spec.js
   ```
4. **Generate and view Allure report**:  
   ```bash
   npm run allureReport
   ```

---

## Page Objects & Test Specs

- **Page Objects** (in `test/pageobjects/`):  
  - `login.page.js` – handles login actions and selectors.  
  - `inventory.page.js` – methods for resetting state, adding items, sorting, and logging out.  
  - `cart.page.js` – manages cart navigation and checkout transition.  
  - `checkout.page.js` – fills checkout details and verifies totals.

- **Test Specs** (in `test/specs/`):  
  - `lockedOutUser.spec.js` – verifies error message for a locked out user.  
  - `standardUser.spec.js` – logs in, resets state, adds three items, verifies checkout, and logs out.  
  - `performanceUser.spec.js` – logs in, resets state, sorts (Z→A), adds an item, verifies checkout, and logs out.

---

## Skills & Technologies Used

- **Testing Tools:** WebdriverIO, Mocha, Allure Reporter, ChromeDriver Service  
- **Design Pattern:** Page Object Model (POM)  
- **Languages:** JavaScript (ES6+), Node.js  
- **CI & Reporting:** npm scripts, npx, Allure CLI  
- **Version Control:** Git, GitHub  

---

## License

This project is licensed under the nokibularfinsiam.
