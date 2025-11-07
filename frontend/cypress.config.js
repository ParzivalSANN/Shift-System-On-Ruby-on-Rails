const { defineConfig } = require('cypress');
const { install, ensureBrowserFlags } = require('@neuralegion/cypress-har-generator');

module.exports = defineConfig({
  video: true,
  e2e: {
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      install(on, config);
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.isElectron) {
          ensureBrowserFlags(browser, launchOptions);
        }
        return launchOptions;
      });
    },
  },
});
