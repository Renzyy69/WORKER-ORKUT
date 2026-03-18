# QRIS Generator & Orderkuota API (Unofficial)

Selamat datang di dokumentasi API tidak resmi untuk **QRIS Generator** dan integrasi **Orderkuota**.

🚀 **Base URL API:** `https://shy-pine-6375.103250113.workers.dev`

## 📚 Dokumentasi Interaktif (Swagger)
Untuk melihat dan mencoba semua endpoint secara langsung, kunjungi:
👉 [**https://shy-pine-6375.103250113.workers.dev/**](https://shy-pine-6375.103250113.workers.dev/)

## 📡 Daftar Endpoint

Berikut adalah endpoint yang tersedia berdasarkan dokumentasi Swagger Anda:

### 1. QRIS Generator
*   **Generate QRIS (JSON atau PNG)**
    *   **Endpoint:** `GET /api/qris`
    *   **Parameter:** `qris_string` (wajib), `amount` (wajib), `format` (opsional: `json`/`png`)
    *   **Coba Langsung:** Buka [dokumentasi Swagger](https://shy-pine-6375.103250113.workers.dev/), klik endpoint `/api/qris`, lalu klik **"Try it out"**.

### 2. Orderkuota (Unofficial)
*   **Login Step 1 - Request OTP**
    *   **Endpoint:** `POST /api/orkut/login`
*   **Login Step 2 - Verifikasi OTP**
    *   **Endpoint:** `POST /api/orkut/verify-otp`
*   **Cek Mutasi QRIS**
    *   **Endpoint:** `POST /api/orkut/qris-history`
*   **Tarik Saldo QRIS**
    *   **Endpoint:** `POST /api/orkut/qris-withdraw`

> **Catatan:** Semua endpoint Orderkuota menggunakan metode `POST` dengan `content-type: application/x-www-form-urlencoded`. Detail parameter bisa dilihat di dokumentasi Swagger.

## 🚀 Cara Deploy Ulang atau Fork
Kode worker ini bisa Anda deploy sendiri di Cloudflare. Jika ingin memodifikasi atau menggunakannya untuk project sendiri:
1.  Klik **"View in GitHub"** (jika repositori publik) atau minta akses ke pemilik.
2.  Ikuti panduan deploy di [Cloudflare Workers Docs](https://developers.cloudflare.com/workers/).

## ⚠️ Disclaimer
*   API Orderkuota bersifat **tidak resmi (unofficial)**. Gunakan dengan bijak dan risiko sendiri.
*   Untuk keperluan development dan pembelajaran.

---
**Dibuat oleh Dragon Store** | ⭐ Star di GitHub jika bermanfaat!
