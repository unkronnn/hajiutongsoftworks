# Admin Panel Guide

## Fitur Admin Panel

Admin panel menyediakan:

- 📊 **Dashboard dengan statistik** - Total users, admin count, verified emails
- 👥 **User Management** - View semua users yang terdaftar
- 🔒 **Role-based Access** - Hanya admin yang bisa akses `/admin`
- 🛡️ **Protected Routes** - Middleware otomatis cek role admin

## Cara Membuat Admin Account

### Opsi 1: Menggunakan Script (Recommended)

Jalankan script `create-admin.mjs` untuk membuat admin account:

```bash
node scripts/create-admin.mjs admin@hajiutong.com "Admin User" MySecurePassword123
```

**Parameter:**

- Email: Email admin (harus unique)
- Name: Nama lengkap admin
- Password: Password minimal 8 karakter

**Contoh:**

```bash
# Membuat admin dengan email admin@hajiutong.com
node scripts/create-admin.mjs admin@hajiutong.com "John Doe" SecurePass2024!

# Output jika berhasil:
# 🔗 Connecting to database...
# ✅ Connected to database
# 🔐 Hashing password...
# 👤 Creating admin user...
# ✅ Admin user created successfully!
#
# 📧 Email: admin@hajiutong.com
# 👤 Name: John Doe
# 🔑 Role: admin
#
# 🎉 You can now login at /login with these credentials
```

### Opsi 2: Manual via MySQL

Jika Anda sudah punya user dan ingin upgrade ke admin:

```sql
-- Via HeidiSQL atau MySQL command line
UPDATE user SET role = 'admin' WHERE email = 'user@example.com';
```

### Opsi 3: Manual Insert

Jika ingin insert manual (lebih kompleks, gunakan script lebih baik):

```sql
-- 1. Insert user
INSERT INTO user (id, name, email, email_verified, role, created_at, updated_at)
VALUES ('admin-unique-id', 'Admin Name', 'admin@hajiutong.com', 1, 'admin', NOW(), NOW());

-- 2. Insert account dengan password (harus di-hash dulu)
-- Tidak recommended, gunakan script saja
```

## Cara Menggunakan Admin Panel

### 1. Login sebagai Admin

1. Buka `/login`
2. Login menggunakan email dan password admin
3. Setelah login, akses `/admin`

### 2. Akses Admin Panel

URL: `http://localhost:5173/admin`

**Fitur yang tersedia:**

#### Dashboard Overview

- Total jumlah users
- Jumlah admin accounts
- Jumlah regular users
- Jumlah email yang sudah verified

#### User Management Table

Menampilkan semua users dengan informasi:

- Name (dengan avatar jika ada)
- Email address
- Role (Admin/User badge)
- Email verification status
- Tanggal registrasi
- Action buttons (Edit - coming soon)

### 3. Security Features

- ✅ Route `/admin` dilindungi middleware
- ✅ Non-admin users akan mendapat 403 Forbidden
- ✅ Non-authenticated users redirect ke `/login`
- ✅ Session dan role dicek di server-side

## Database Schema

Kolom `role` ditambahkan ke tabel `user`:

```typescript
role: mysqlEnum("role", ["user", "admin"]).default("user").notNull()
```

**Nilai yang valid:**

- `user` - Regular user (default)
- `admin` - Administrator

## Troubleshooting

### Error: "Forbidden: Admin access required"

**Penyebab:** User yang login bukan admin
**Solusi:** Pastikan role user adalah 'admin' di database

### Error: "User already exists"

**Penyebab:** Email sudah terdaftar
**Solusi:** Gunakan email lain atau upgrade user existing ke admin

### Error: "Cannot connect to database"

**Penyebab:** MySQL tidak running
**Solusi:**

```bash
# Cek MySQL status
brew services list | grep mysql

# Start MySQL jika belum running
brew services start mysql
```

### Script tidak jalan

**Penyebab:** Script tidak executable atau wrong format
**Solusi:**

```bash
# Berikan permission
chmod +x scripts/create-admin.mjs

# Pastikan file extension .mjs
# Jalankan dengan node
node scripts/create-admin.mjs email name password
```

## Rencana Pengembangan

Fitur yang akan ditambahkan:

- [ ] Edit user role dari admin panel
- [ ] Delete user functionality
- [ ] Ban/Suspend user
- [ ] View user activity logs
- [ ] Export user data
- [ ] Advanced filtering dan search
- [ ] Bulk actions
- [ ] Email notification management
- [ ] System settings configuration

## Security Best Practices

1. **Jangan share admin credentials** - Keep admin passwords secure
2. **Use strong passwords** - Minimal 12 characters dengan kombinasi
3. **Limit admin accounts** - Hanya buat admin yang benar-benar diperlukan
4. **Regular audit** - Check admin panel regularly untuk suspicious activity
5. **Enable 2FA** (future feature) - Two-factor authentication for admin

## API Endpoints (for future development)

Endpoint admin yang bisa dikembangkan:

```typescript
// Update user role
POST /api/admin/users/{id}/role
Body: { role: "admin" | "user" }

// Delete user
DELETE /api/admin/users/{id}

// Ban user
POST /api/admin/users/{id}/ban
Body: { reason: string, duration: number }

// Get analytics
GET /api/admin/analytics
```

## Production Deployment

Saat deploy ke production:

1. **Change default admin password** immediately
2. **Enable HTTPS** untuk semua admin routes
3. **Add rate limiting** untuk prevent brute force
4. **Enable audit logging** untuk track admin actions
5. **Setup monitoring** untuk suspicious activity
