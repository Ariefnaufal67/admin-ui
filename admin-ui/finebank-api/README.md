# FineBank API

Backend REST API untuk **FineBank Admin UI** (proyek Pemrograman Sisi Klien) — tugas Pemrograman Sisi Server.
Stack: Node.js 22, Express 5, Sequelize (SQLite lokal / PostgreSQL produksi), JWT, Zod, express-rate-limit, Swagger UI, node:test + supertest.

## Menjalankan
```bash
npm install
cp .env.example .env      # isi JWT_SECRET
npm run seed              # data contoh (password semua akun: password123)
npm run dev               # http://localhost:3000  | docs: /docs
npm test                  # 24 unit/integration test
```
Akun seed: `admin@finebank.test` (admin), `arief@finebank.test` (user).

## Fitur
- Auth JWT (register, login, me) + role `admin` / `user`
- CRUD Categories, Expenses, Bills; endpoint `GET /api/expenses/summary`, `POST /api/bills/:id/pay`
- Pagination (`page`, `limit`), filter (`q`, `categoryId`, `minAmount`, `maxAmount`, `from`, `to`, `status`), sort (`sort=-amount`)
- Throttling: 100 req/15 menit per IP untuk `/api`, 10 req/15 menit untuk login & register
- Validasi Zod, error JSON seragam, isolasi data per user
- Docs: Swagger UI di `/docs`, spesifikasi di `/openapi.json`; koleksi Postman di `postman/`

## Hosting (Railway + PostgreSQL)
1. Push repo ke GitHub, di Railway pilih *Deploy from GitHub repo*.
2. Tambah plugin **PostgreSQL**; Railway mengisi `DATABASE_URL` otomatis.
3. Set variable: `JWT_SECRET` (acak, panjang), `CORS_ORIGIN` (URL frontend), `DATABASE_SSL=true` bila diperlukan.
4. Deploy; cek `/health` dan `/docs`. Tabel dibuat otomatis saat start (`sequelize.sync`).
