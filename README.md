# SauceDemo WebdriverIO E2E Suite

This repository contains a WebdriverIO + Mocha test suite for [SauceDemo](https://www.saucedemo.com/). It uses a **Page Object Model** structure, runs tests sequentially, and generates an **Allure** report.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Execution Process](#execution-process)
5. [Page Objects & Test Specs](#page-objects--test-specs)
6. [Skills & Technologies Used](#skills--technologies-used)
7. [License](#license)

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
   git clone https://github.com/<your-username>/web_io.git
   cd web_io
   ```
2. **Install dependencies**  
   ```bash
   npm install
   ```

This installs all required WebdriverIO packages, ChromeDriver, and Allure.

---

## Project Structure

```
web_io/
├── test/
│   ├── pageobjects/
│   │   ├── login.page.js
│   │   ├── inventory.page.js
│   │   ├── cart.page.js
│   │   └── checkout.page.js
│   └── specs/
│       ├── lockedOutUser.spec.js
│       ├── standardUserFlow.spec.js
│       └── performanceUserFlow.spec.js
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
   npm test -- --spec ./test/specs/standardUserFlow.spec.js
   ```
4. **Generate and view Allure report**:  
   ```bash
   npm run allure:report
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
  - `standardUserFlow.spec.js` – logs in, resets state, adds three items, verifies checkout, and logs out.  
  - `performanceUserFlow.spec.js` – logs in, resets state, sorts (Z→A), adds an item, verifies checkout, and logs out.

---

## Skills & Technologies Used

- **Testing Tools:** WebdriverIO, Mocha, Allure Reporter, ChromeDriver Service  
- **Design Pattern:** Page Object Model (POM)  
- **Languages:** JavaScript (ES6+), Node.js  
- **CI & Reporting:** npm scripts, npx, Allure CLI  
- **Version Control:** Git, GitHub  

---

## License

This project is licensed under the MIT License.
