/// <reference types="cypress" />

// =========================================================================
// SOAL 7 - E2E Test: User mengakses halaman Dashboard (Overview)
//
// Skenario:
// 1. User yang BELUM login mencoba membuka halaman dashboard ("/")
//    -> harus otomatis diarahkan (redirect) ke halaman "/login".
// 2. User login dengan akun yang valid (email & password)
//    -> setelah submit, user diarahkan ke halaman Overview ("/").
// 3. Di halaman Overview, pastikan seluruh elemen utama dashboard tampil:
//    - Sapaan nama user di header
//    - Menu navigasi di sidebar (Overview, Balances, Expenses, dst)
//    - Menu "Overview" berstatus aktif
//    - Card "Total Balance", "Goals", "Upcoming Bill"
//    - Card "Recent Transaction" beserta tab All/Revenue/Expense
//    - Card "Statistics" (grafik Weekly Comparison)
//    - Card "Expenses Breakdown" beserta 6 kategori pengeluaran
//
// Cara menjalankan:
//   1. Isi email & password akun mahasiswa kamu di cypress.env.json
//      (contoh ada di cypress.env.json.example), ATAU jalankan dengan:
//      npx cypress run --env STUDENT_EMAIL=xxx,STUDENT_PASSWORD=yyy
//   2. Pastikan dev server jalan (npm run dev), lalu:
//      npm run cypress:open   -> mode interaktif
//      npm run cypress:run    -> mode headless
//      npm run e2e            -> otomatis start dev server + run test
// =========================================================================

describe("Dashboard (Overview) Page", () => {
  const email = Cypress.env("STUDENT_EMAIL") || "student@example.com";
  const password = Cypress.env("STUDENT_PASSWORD") || "password123";

  context("Ketika user belum login", () => {
    it("mengarahkan (redirect) ke halaman /login saat mencoba akses dashboard", () => {
      cy.visit("/");
      cy.url().should("include", "/login");
      cy.contains("Email address").should("be.visible");
    });
  });

  context("Ketika user berhasil login", () => {
    beforeEach(() => {
      cy.login(email, password);
      cy.visit("/");
    });

    it("menampilkan halaman Overview dengan URL root ('/')", () => {
      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });

    it("menampilkan sapaan nama user pada header", () => {
      cy.contains(/^Hello/i).should("be.visible");
    });

    it("menandai menu 'Overview' pada sidebar sebagai menu aktif", () => {
      cy.get("nav").contains("a", "Overview").should("have.class", "bg-primary");
    });

    it("menampilkan semua menu navigasi utama di sidebar", () => {
      [
        "Overview",
        "Balances",
        "Transaction",
        "Bills",
        "Expenses",
        "Goals",
        "Settings",
      ].forEach((menuName) => {
        cy.get("nav").contains(menuName).should("be.visible");
      });
    });

    it("menampilkan card 'Total Balance' beserta nominal saldo", () => {
      cy.contains("Total Balance").should("be.visible");
      cy.contains("All account").should("be.visible");
      cy.contains(/\$[\d,]+/).should("be.visible");
    });

    it("menampilkan card 'Goals' dan 'Upcoming Bill'", () => {
      cy.contains("Goals").should("be.visible");
      cy.contains("Upcoming Bill").should("be.visible");
    });

    it("menampilkan card 'Recent Transaction' dengan tab filter", () => {
      cy.contains("Recent Transaction").should("be.visible");
      cy.contains("All").should("be.visible");
      cy.contains("Revenue").should("be.visible");
      cy.contains("Expense").should("be.visible");
    });

    it("menampilkan card 'Statistics' dengan grafik Weekly Comparison", () => {
      cy.contains("Statistics").should("be.visible");
      cy.contains("Weekly Comparison").should("be.visible");
    });

    it("menampilkan card 'Expenses Breakdown' beserta 6 kategori", () => {
      cy.contains("Expenses Breakdown").should("be.visible");

      [
        "Housing",
        "Food",
        "Transportation",
        "Entertainment",
        "Shopping",
        "Others",
      ].forEach((category) => {
        cy.contains(category).should("be.visible");
      });
    });
  });
});
