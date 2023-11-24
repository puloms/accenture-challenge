const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportWidth: 1760,
    viewportHeight: 1175,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
