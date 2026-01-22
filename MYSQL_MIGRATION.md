# Migrasi dari PostgreSQL ke MySQL

## Perubahan yang telah dilakukan:

1. ✅ **docker-compose.yml** - Diubah dari PostgreSQL ke MySQL 8.0
2. ✅ **drizzle.config.ts** - Dialect diubah ke `mysql`
3. ✅ **src/lib/server/db/index.ts** - Connection diubah ke MySQL menggunakan `mysql2`
4. ✅ **package.json** - Dependency `postgres` diganti dengan `mysql2`
5. ✅ **Schema files** - Semua schema diubah dari `pgTable` ke `mysqlTable`
6. ✅ **Migration files** - Migrasi MySQL baru telah digenerate

## Cara Setup Database MySQL:

### Opsi 1: Menggunakan Docker (Recommended)

1. **Update file .env Anda:**

   ```bash
   cp .env.mysql.example .env
   ```

   Atau tambahkan ke file .env yang ada:

   ```env
   DATABASE_URL="mysql://root:mysecretpassword@localhost:3306/hajiutong"
   DB_USER="root"
   DB_PASSWORD="mysecretpassword"
   DB_NAME="hajiutong"
   DB_PORT="3306"
   ```

2. **Jalankan MySQL dengan Docker:**

   ```bash
   docker compose up -d
   ```

3. **Jalankan migrasi database:**
   ```bash
   pnpm drizzle-kit push
   ```

### Opsi 2: MySQL Local (Tanpa Docker)

1. **Install MySQL dengan Homebrew:**

   ```bash
   brew install mysql
   brew services start mysql
   ```

2. **Buat database:**

   ```bash
   mysql -u root -p
   ```

   Lalu di MySQL console:

   ```sql
   CREATE DATABASE hajiutong;
   CREATE USER 'root'@'localhost' IDENTIFIED BY 'mysecretpassword';
   GRANT ALL PRIVILEGES ON hajiutong.* TO 'root'@'localhost';
   FLUSH PRIVILEGES;
   EXIT;
   ```

3. **Update .env** seperti opsi 1

4. **Jalankan migrasi:**
   ```bash
   pnpm drizzle-kit push
   ```

## Akses dengan HeidiSQL:

**Koneksi Settings:**

- Network type: `MySQL (TCP/IP)`
- Hostname: `localhost`
- User: `root`
- Password: `mysecretpassword` (sesuai .env Anda)
- Port: `3306`
- Database: `hajiutong`

## Verifikasi:

1. Start development server:

   ```bash
   pnpm dev
   ```

2. Cek apakah error `ECONNREFUSED` sudah hilang

## Rollback ke PostgreSQL (jika diperlukan):

Jika Anda ingin kembali ke PostgreSQL, jalankan:

```bash
git checkout src/lib/server/db/
git checkout drizzle.config.ts
git checkout docker-compose.yml
git checkout package.json
pnpm install
```
