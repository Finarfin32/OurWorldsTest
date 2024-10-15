# TestOurWorld

Automated Tests for the Our2Worlds Website
This test suite automates the verification of basic functionalities of the Our2Worlds website using Playwright. The tests are focused on interactions with the site’s UI components, including buttons, links, maps, and sliders, across different sections of the site.

## Features Tested:

- **Button Clicks and Navigation**

Verifies the visibility and functionality of buttons for selecting different factions, such as Imperium w Płomieniach and Kroniki Arborgu. The tests ensure proper navigation and interaction with related UI elements.

- **Forum Links**

Tests the redirection to specific forum topics within the selected factions, checking if forum content such as Królestwo Dorwin and Spotkanie (cz. I) is visible and interactive.

- **Map Interaction**

Ensures that the map within the Imperium w Płomieniach section is displayed correctly, is zoomable, and that map controls (zoom in/out) work as expected.

- **Slider Functionality**

Validates the functionality of the image slider within the site. The tests check the visibility and navigation through slides using both the next and previous buttons, including edge cases like multiple and double-clicks.

## Technologies Used:

- **Playwright:** For browser automation and UI testing.
- **Node.js:** Test environment for running Playwright scripts.

## Links

- code repository https://github.com/Finarfin32/OurWorldsTest

## Commands

- check `NodeJS` version  
  `node -v`
- new project with Playwright  
  `npm init playwright@latest`
- record tests for given site  
  `npx playwright codegen https://our2worlds.pl/`
- run tests without browser GUI  
  `npx playwright test`
- run tests with browser GUI  
  `npx playwright test --headed`
- view report  
  `npx playwright show-report`

## Playwright Config modifications

- config file `playwright.config.ts`
- disable browsers, i.e. Firefox
  ```javascript
  // {
  //   name: 'firefox',
  //   use: {
  //     ...devices['Desktop Firefox'],
  //   },
  // },
  ```
