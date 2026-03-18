// DIBUAT OLEH DRAGON STORE (Unofficial ORKUT QRIS Generator)//
const swaggerHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API Documentation - QRIS Generator (Unofficial)</title>
  <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@3/swagger-ui.css">
  <style>
    body { margin: 0; padding: 0; }
    .swagger-ui .topbar { display: none; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-bundle.js"></script>
  <script src="https://unpkg.com/swagger-ui-dist@3/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: '/swagger.json',
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "BaseLayout",
        deepLinking: true
      });
    };
  </script>
</body>
</html>
`;

// ==================== SWAGGER JSON ====================
// DIBUAT OLEH DRAGON STORE (Unofficial API)
const swaggerJSON = {
  openapi: "3.0.0",
  info: {
    title: "QRIS Generator API (Unofficial)",
    description: "API untuk generate QRIS dengan QRIS string kustom\n\n**Endpoint:**\n- **/api/qris** - Generate QRIS (JSON atau PNG)\n- **/api/orkut/*** - Endpoints for Orderkuota integration",
    version: "1.0.0"
  },
  servers: [
    {
      url: "/",
      description: "Local Server"
    }
  ],
  paths: {
    "/api/qris": {
      get: {
        summary: "Generate QRIS (JSON atau PNG)",
        description: "Generate QRIS dengan QRIS string Anda sendiri\n\n**Parameter:**\n- `qris_string` (wajib): QRIS string Anda\n- `amount` (wajib): Nominal pembayaran\n- `format` (opsional): `json` (default) atau `png`\n\n**Contoh:**\n- `/api/qris?qris_string=xxx&amount=1000` → JSON\n- `/api/qris?qris_string=xxx&amount=1000&format=png` → Gambar PNG",
        parameters: [
          {
            name: "qris_string",
            in: "query",
            description: "QRIS string Anda (wajib)",
            required: true,
            schema: {
              type: "string",
              example: "00020101021126670016COM.NOBUBANK.WWW01189360050300000879140214158171648691720303UMI51440014ID.CO.QRIS.WWW0215ID20253746163520303UMI5204541153033605802ID5922TOKO ANDA6809JAKARTA61051234562070703A016304ABCD"
            }
          },
          {
            name: "amount",
            in: "query",
            description: "Nominal pembayaran (akan ditambah random 1-99)",
            required: true,
            schema: {
              type: "integer",
              minimum: 1000,
              default: 50000
            }
          },
          {
            name: "format",
            in: "query",
            description: "Format response: json (default) atau png",
            required: false,
            schema: {
              type: "string",
              enum: ["json", "png"],
              default: "json"
            }
          }
        ],
        responses: {
          200: {
            description: "QRIS berhasil digenerate",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    merchant: { type: "string" },
                    location: { type: "string" },
                    amount: { type: "integer" },
                    amount_original: { type: "integer" },
                    random_add: { type: "integer" },
                    reference: { type: "string" },
                    qr_string: { type: "string" },
                    image_data: { type: "string", description: "Base64 image PNG" }
                  }
                }
              },
              "image/png": {
                description: "Langsung gambar PNG"
              }
            }
          },
          400: {
            description: "Parameter tidak valid"
          },
          500: {
            description: "Internal server error"
          }
        }
      }
    },
    "/api/orkut/login": {
      post: {
        tags: ["Orderkuota (Unofficial)"],
        summary: "Login Step 1 - Request OTP",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["username", "password"],
                properties: {
                  username: { type: "string", example: "08123456789" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: { 
          200: { description: "OTP terkirim" },
          400: { description: "Request tidak valid" }
        }
      }
    },
    "/api/orkut/verify-otp": {
      post: {
        tags: ["Orderkuota (Unofficial)"],
        summary: "Login Step 2 - Verifikasi OTP",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["username", "otp"],
                properties: {
                  username: { type: "string", example: "08123456789" },
                  otp: { type: "string", example: "123456" }
                }
              }
            }
          }
        },
        responses: { 
          200: { description: "Token didapatkan" },
          400: { description: "OTP tidak valid" }
        }
      }
    },
    "/api/orkut/qris-history": {
      post: {
        tags: ["Orderkuota (Unofficial)"],
        summary: "Cek Mutasi QRIS",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["username", "token"],
                properties: {
                  username: { type: "string", example: "08123456789" },
                  token: { type: "string", example: "merchant_id:token_string" },
                  jenis: { type: "string", enum: ["masuk", "keluar"], example: "masuk" },
                  dari_tanggal: { type: "string", example: "2024-01-01" },
                  ke_tanggal: { type: "string", example: "2024-12-31" },
                  signature: { type: "string" },
                  timestamp: { type: "string" }
                }
              }
            }
          }
        },
        responses: { 
          200: { description: "Data mutasi QRIS" },
          400: { description: "Parameter tidak lengkap" }
        }
      }
    },
    "/api/orkut/qris-withdraw": {
      post: {
        tags: ["Orderkuota (Unofficial)"],
        summary: "Tarik Saldo QRIS",
        requestBody: {
          required: true,
          content: {
            "application/x-www-form-urlencoded": {
              schema: {
                type: "object",
                required: ["username", "token", "amount"],
                properties: {
                  username: { type: "string", example: "08123456789" },
                  token: { type: "string", example: "merchant_id:token_string" },
                  amount: { type: "string", example: "100000" }
                }
              }
            }
          }
        },
        responses: { 
          200: { description: "Penarikan diproses" },
          400: { description: "Saldo tidak cukup / parameter invalid" }
        }
      }
    }
  }
};

// DIBUAT OLEH DRAGON STORE (Unofficial QRIS Generator)
function calculateCRC16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= (data.charCodeAt(i) << 8);
        for (let j = 0; j < 8; j++) {
            if (crc & 0x8000) {
                crc = (crc << 1) ^ 0x1021;
            } else {
                crc = crc << 1;
            }
            crc &= 0xFFFF;
        }
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
}


// DIBUAT OLEH DRAGON STORE (Unofficial QRIS Generator)
function generateQRString(baseQr, amount) {
    if (!baseQr || baseQr.length < 50) {
        throw new Error("QRIS string tidak valid");
    }
    
    let qrisBase = baseQr.length > 4 ? baseQr.substring(0, baseQr.length - 4) : baseQr;
    
    if (qrisBase.includes("010211")) {
        qrisBase = qrisBase.replace("010211", "010212");
    }
    
    const nominalStr = amount.toString();
    const nominalTag = `54${nominalStr.length.toString().padStart(2, '0')}${nominalStr}`;
    
    const insertPosition = qrisBase.indexOf("5802ID");
    if (insertPosition === -1) {
        throw new Error("Format QRIS tidak valid: tidak ditemukan 5802ID");
    }
    
    const qrisWithNominal = qrisBase.substring(0, insertPosition) + nominalTag + qrisBase.substring(insertPosition);
    const checksum = calculateCRC16(qrisWithNominal);
    
    return qrisWithNominal + checksum;
}


function extractQRISInfo(qrisString) {
    let merchant = "Unknown";
    let location = "Unknown";
    
    const merchantMatch = qrisString.match(/59(\d{2})(.{0,25})/);
    if (merchantMatch && merchantMatch[2]) {
        merchant = merchantMatch[2].trim();
    }
    
    const locationMatch = qrisString.match(/60(\d{2})(.{0,15})/);
    if (locationMatch && locationMatch[2]) {
        location = locationMatch[2].trim();
    }
    
    return { merchant, location };
}


async function generateQRImage(text) {
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(text)}&ecc=H&margin=4`;
    const response = await fetch(qrApiUrl);
    if (!response.ok) throw new Error("Gagal generate QR");
    return await response.arrayBuffer();
}


const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};


const API_BASE = "https://app.orderkuota.com/api/v2";
const HEADERS_BASE = {
  "User-Agent": "okhttp/4.12.0",
  "Content-Type": "application/x-www-form-urlencoded"
};
const APP_PARAMS = {
  app_version_name: "26.02.04",
  app_version_code: "260204",
  app_reg_id: "di309HvATsaiCppl5eDpoc:APA91bFUcTOH8h2XHdPRz2qQ5Bezn-3_TaycFcJ5pNLGWpmaxheQP9Ri0E56wLHz0_b1vcss55jbRQXZgc9loSfBdNa5nZJZVMlk7GS1JDMGyFUVvpcwXbMDg8tjKGZAurCGR4kDMDRJ"
};


// QRIS Generator Unofficial API - DIBUAT OLEH DRAGON STORE
export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;
        
        // Handle OPTIONS
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }
        
        // Swagger UI
        if (request.method === "GET" && (path === "/" || path === "/docs" || path === "/swagger")) {
            return new Response(swaggerHTML, {
                headers: { "Content-Type": "text/html; charset=UTF-8" }
            });
        }
        
        // Swagger JSON
        if (request.method === "GET" && path === "/swagger.json") {
            return new Response(JSON.stringify(swaggerJSON), {
                headers: { "Content-Type": "application/json", ...corsHeaders }
            });
        }
        
      
        if (request.method === "GET" && path === "/api/qris") {
            try {
                const qrisString = url.searchParams.get('qris_string');
                const amount = url.searchParams.get('amount');
                const format = url.searchParams.get('format') || 'json';
                
                if (!qrisString) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Parameter qris_string wajib diisi'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders }
                    });
                }
                
                if (!amount) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Parameter amount wajib diisi'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders }
                    });
                }
                
                let nominal = parseInt(amount);
                if (isNaN(nominal) || nominal <= 0) {
                    return new Response(JSON.stringify({
                        success: false,
                        error: 'Amount harus angka positif'
                    }), {
                        status: 400,
                        headers: { 'Content-Type': 'application/json', ...corsHeaders }
                    });
                }
                
                const randomAdd = Math.floor(Math.random() * 99) + 1;
                nominal = nominal + randomAdd;
                
                const finalQrString = generateQRString(qrisString, nominal);
                const imageBuffer = await generateQRImage(finalQrString);
                
                if (format.toLowerCase() === 'png') {
                    return new Response(imageBuffer, {
                        headers: {
                            'Content-Type': 'image/png',
                            'Content-Disposition': `inline; filename="qris-${nominal}.png"`,
                            'Cache-Control': 'no-cache',
                            ...corsHeaders
                        }
                    });
                }
                
                const base64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
                const imageData = `data:image/png;base64,${base64}`;
                const info = extractQRISInfo(qrisString);
                
                return new Response(JSON.stringify({
                    success: true,
                    merchant: info.merchant,
                    location: info.location,
                    amount: nominal,
                    amount_original: parseInt(amount),
                    random_add: randomAdd,
                    reference: Date.now().toString(),
                    qr_string: finalQrString,
                    image_data: imageData
                }), {
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
                
            } catch (error) {
                return new Response(JSON.stringify({
                    success: false,
                    error: error.message
                }), {
                    status: 500,
                    headers: { 'Content-Type': 'application/json', ...corsHeaders }
                });
            }
        }
        

        if (request.method === "POST") {
            const contentType = request.headers.get("content-type") || "";
            let data = {};
            
            if (contentType.includes("application/json")) {
                data = await request.json();
            } else {
                const formData = await request.formData();
                data = Object.fromEntries(formData.entries());
            }
            
            if (path === "/api/orkut/login") {
                return loginOrkut(data.username, data.password);
            }
            if (path === "/api/orkut/verify-otp") {
                return verifyOtp(data.username, data.otp);
            }
            if (path === "/api/orkut/qris-history") {
                return getQrisHistory(data);
            }
            if (path === "/api/orkut/qris-withdraw") {
                return withdrawQris(data.username, data.token, data.amount);
            }
        }
        
        return new Response("Not Found", { status: 404 });
    }
};


async function loginOrkut(username, password) {
    if (!username || !password) {
        return new Response(JSON.stringify({ success: false, message: "username/password wajib diisi" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    const payload = new URLSearchParams({ username, password, ...APP_PARAMS });
    return proxyRequest(`${API_BASE}/login`, payload);
}

async function verifyOtp(username, otp) {
    if (!username || !otp) {
        return new Response(JSON.stringify({ success: false, message: "username/otp wajib diisi" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    const payload = new URLSearchParams({ username, password: otp, ...APP_PARAMS });
    return proxyRequest(`${API_BASE}/login`, payload);
}

async function getQrisHistory(data) {
    const { username, token, jenis = "", dari_tanggal = "", ke_tanggal = "", signature = "", timestamp = "" } = data;
    
    if (!username || !token) {
        return new Response(JSON.stringify({ success: false, message: "username/token wajib diisi" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    
    const merchantId = token.includes(":") ? token.split(":")[0] : "";
    if (!merchantId) {
        return new Response(JSON.stringify({ success: false, message: "token tidak valid" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    
    const ts = (timestamp && String(timestamp)) || Date.now().toString();
    
    const payload = new URLSearchParams({
        auth_token: token,
        auth_username: username,
        "requests[qris_history][jumlah]": "",
        "requests[qris_history][jenis]": jenis || "",
        "requests[qris_history][page]": "1",
        "requests[qris_history][dari_tanggal]": dari_tanggal || "",
        "requests[qris_history][ke_tanggal]": ke_tanggal || "",
        "requests[qris_history][keterangan]": "",
        "requests[0]": "account",
        request_time: ts,
        ...APP_PARAMS
    });
    
    const headers = new Headers(HEADERS_BASE);
    headers.set("timestamp", ts);
    if (signature) headers.set("signature", signature);
    
    try {
        const resp = await fetch(`${API_BASE}/qris/mutasi/${merchantId}`, {
            method: "POST",
            headers,
            body: payload
        });
        
        return new Response(resp.body, { 
            status: resp.status, 
            headers: { "Content-Type": resp.headers.get("content-type") || "application/json" }
        });
        
    } catch (err) {
        return new Response(JSON.stringify({ success: false, message: "Fetch failed", error: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}

async function withdrawQris(username, token, amount) {
    if (!username || !token) {
        return new Response(JSON.stringify({ success: false, message: "username/token wajib diisi" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    if (!amount || isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
        return new Response(JSON.stringify({ success: false, message: "amount harus angka positif" }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
        });
    }
    const payload = new URLSearchParams({
        auth_token: token,
        auth_username: username,
        "requests[qris_withdraw][amount]": amount,
        ...APP_PARAMS
    });
    return proxyRequest(`${API_BASE}/get`, payload);
}

async function proxyRequest(url, payload) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: HEADERS_BASE,
            body: payload
        });
        return new Response(response.body, {
            status: response.status,
            headers: { "Content-Type": response.headers.get("content-type") || "application/json" }
        });
    } catch (err) {
        return new Response(JSON.stringify({
            success: false,
            message: "Fetch failed",
            error: err.message
        }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}
