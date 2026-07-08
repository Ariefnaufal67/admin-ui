// Custom command untuk login lewat UI, lalu di-cache pakai cy.session()
// supaya tiap `it()` tidak perlu login ulang dari nol (lebih cepat & stabil).
Cypress.Commands.add("login", (email, password) => {
  const userEmail = email || Cypress.env("STUDENT_EMAIL");
  const userPassword = password || Cypress.env("STUDENT_PASSWORD");

  cy.session(
    [userEmail, userPassword],
    () => {
      cy.visit("/login");
      cy.get("#email").type(userEmail);
      cy.get("#password").type(userPassword);
      cy.contains("button", "Login").click();

      // Login sukses ditandai dengan redirect ke halaman dashboard ("/")
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    },
    {
      validate() {
        cy.window().its("localStorage.token").should("exist");
      },
    }
  );
});
