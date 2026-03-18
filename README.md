# QRIS Generator & Orderkuota API (Unofficial)

Selamat datang di dokumentasi API tidak resmi untuk **QRIS Generator** dan integrasi **Orderkuota**.

🚀 **Base URL API:** `https://shy-pine-6375.103250113.workers.dev`

---

## 📚 Dokumentasi Interaktif (Swagger)
Untuk melihat dan mencoba semua endpoint secara langsung, kunjungi:
👉 [**https://shy-pine-6375.103250113.workers.dev/**](https://shy-pine-6375.103250113.workers.dev/)

---

## 📡 Daftar Endpoint & Contoh Curl

### 1. QRIS Generator
**Endpoint:** `GET /api/qris`

**Parameter:**
| Parameter | Wajib | Deskripsi |
|-----------|-------|-----------|
| `qris_string` | ✅ | QRIS string Anda |
| `amount` | ✅ | Nominal pembayaran (min 1000) |
| `format` | ❌ | `json` (default) atau `png` |

#### Contoh JSON Response
```bash
curl -X GET "https://shy-pine-6375.103250113.workers.dev/api/qris?qris_string=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214158171648691720303UMI51440014ID.CO.QRIS.WWW0215ID20253746163520303UMI5204541153033605802ID5922TOKO ANDA6809JAKARTA61051234562070703A016304ABCD&amount=50000"
```

#### Contoh PNG Langsung
```bash
curl -X GET "https://shy-pine-6375.103250113.workers.dev/api/qris?qris_string=00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214158171648691720303UMI51440014ID.CO.QRIS.WWW0215ID20253746163520303UMI5204541153033605802ID5922TOKO ANDA6809JAKARTA61051234562070703A016304ABCD&amount=50000&format=png" --output qris.png
```

---

### 2. Orderkuota Integration (Unofficial)

#### 🔐 Login Step 1 - Request OTP
**Endpoint:** `POST /api/orkut/login`
```bash
curl -X POST "https://shy-pine-6375.103250113.workers.dev/api/orkut/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=08123456789&password=password123"
```

#### 🔓 Login Step 2 - Verifikasi OTP
**Endpoint:** `POST /api/orkut/verify-otp`
```bash
curl -X POST "https://shy-pine-6375.103250113.workers.dev/api/orkut/verify-otp" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=08123456789&otp=123456"
```

#### 📊 Cek Mutasi QRIS
**Endpoint:** `POST /api/orkut/qris-history`
```bash
curl -X POST "https://shy-pine-6375.103250113.workers.dev/api/orkut/qris-history" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=08123456789&token=merchant_id:token_string&jenis=masuk"
```

#### 💸 Tarik Saldo QRIS
**Endpoint:** `POST /api/orkut/qris-withdraw`
```bash
curl -X POST "https://shy-pine-6375.103250113.workers.dev/api/orkut/qris-withdraw" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=08123456789&token=merchant_id:token_string&amount=100000"
```

---

## ⚠️ Catatan Penting

- **QRIS Generator:** Nominal akan ditambah random 1-99 (sesuai aturan QRIS)
- **Orderkuota API:** Bersifat **tidak resmi (unofficial)** - gunakan dengan bijak
- Semua endpoint Orderkuota menggunakan `Content-Type: application/x-www-form-urlencoded`
- Token didapat dari response `verify-otp` dengan format `merchant_id:token_string`
- Untuk tujuan **development dan pembelajaran**

---

## 🚀 Deploy Sendiri

Kode worker ini bisa Anda deploy sendiri di Cloudflare:

1. Clone repository
2. Deploy dengan Wrangler CLI atau via Dashboard
3. Lihat dokumentasi [Cloudflare Workers](https://developers.cloudflare.com/workers/)

---

## 📄 Lisensi

MIT License

---

**Dibuat oleh Dragon Store** | ⭐ Star di GitHub jika bermanfaat!
