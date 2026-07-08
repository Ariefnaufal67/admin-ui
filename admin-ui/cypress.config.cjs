const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Sesuaikan kalau port dev server kamu beda (lihat output `npm run dev`)
    baseUrl: "http://localhost:5173",
    supportFile: "cypress/support/e2e.js",
    specPattern: "cypress/e2e/**/*.cy.js",
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
