# Menerapkan Automation Testing dan CI CD pada Aplikasi Forum Diskusi

- **[Dicoding](dicoding.com)**
- Path: **React**
- Course: **Menjadi React Web Developer Expert**
- Submission Akhir (2/2): **Menerapkan Automation Testing dan CI/CD pada Aplikasi Forum Diskusi**.

## Tujuan Akhir

1. Buat pengujian mulai dari Unit, Integration, dan End-to-End pada Aplikasi Forum Diskusi.
2. Deploy Aplikasi Forum Diskusi dengan teknik CI/CD.
3. Memanfaatkan salah satu React Ecosystem pada Aplikasi Forum Diskusi.

## Kriteria Utama

### 1. Automation Testing
- Buat minimal dua pengujian fungsi Reducer.
- Buat minimal dua pengujian Thunk Function.
- Buat minimal dua pengujian React Components.
- Buat minimal satu pengujian End-to-End untuk alur login aplikasi.
- Wajib menulis skenario pengujian pada masing-masing berkas pengujian.
- Pengujian dapat dijalankan dengan perintah **npm test** dan **npm run e2e**.

**Catatan penting**.
Anda bisa tentukan sendiri fungsi reducer, thunk, dan React component yang hendak diuji. Untuk mengasah kemampuan, kami sarankan untuk menguji unit yang kompleks. Contonya, fungsi reducer yang memiliki banyak kondisi atau fungsi thunk yang men-dispatch banyak action.

### 2. Deployment Aplikasi

- Deploy aplikasi dengan menggunakan teknik CI/CD.
- Continuous Integration diterapkan dengan GitHub Actions.
- Continuous Deployment diterapkan dengan Vercel.
- Memproteksi branch master.
- Melampirkan URL Vercel aplikasi Anda pada catatan submission.
- Melampirkan screenshot sebagai bukti telah menerapkan konfigurasi CI/CD dan branch protection dengan benar. Screenshot yang perlu dilampirkan:
    - **1_ci_check_error**: menunjukkan CI check error karena pengujian gagal, contohnya.
    ![1_ci_check_error](https://assets.cdn.dicoding.com/original/academy/dos:9ad5ec697da017001967f5a230f0c0f020221111102335.jpeg)
    - **2_ci_check_pass**: menunjukkan CI check pass karena pengujian lolos, contohnya.
    ![2_ci_check_pass](https://assets.cdn.dicoding.com/original/academy/dos:d5d5fc9ae2eb95f6682dbd4266f2ef5d20221111102422.jpeg)
    - **3_branch_protection**: menunjukkan branch proteksi pada halaman PR, contohnya.
    3_branch_protection: menunjukkan branch proteksi pada halaman PR, contohnya.
    ![3_branch_protection](https://assets.cdn.dicoding.com/original/academy/dos:7b70f73cc59019697967ec26f092c8eb20221111102459.jpeg)

**Catatan penting**.
- Untuk mengurangi tingkat plagiarisme, kami menyarankan untuk membuat repository GitHub secara private.
- Screenshot dilampirkan di dalam berkas ZIP proyek. Berikut contoh struktur folder proyeknya. ![struktur folder screenshot](https://assets.cdn.dicoding.com/original/academy/dos:41cb311286c38353c5030f2d9dc7fb0120221111102537.jpeg)

### 3. Memanfaatkan Salah Satu Ecosystem React

- Memanfaatkan minimal satu React Ecosystem pada [**daftar berikut**](https://github.com/dicodingacademy/awesome-react-ecosystem#react-tools).
- Berikut penggunaan Ecosystem React yang **tidak kami pertimbangkan** untuk memenuhi kriteria.
    - Create React Apps
    - Vite
    - React Router
    - React Icons
    - Redux
    - Redux Thunk
    - Redux Toolkit
    - Jest
    - Vitest
    - React Testing Library

### 4. Mempertahankan Kriteria Submission Sebelumnya

Aplikasi harus tetap mempertahankan kriteria utama yang ada di submission sebelumnya.
- Fungsionalitas Aplikasi
- Bugs Highlighting
- Arsitektur Aplikasi

## Penilaian

Submission akan dinilai oleh reviewer dalam skala 1-5. Untuk mendapatkan nilai tinggi, Anda bisa menerapkan beberapa saran berikut.

- Terdapat lebih dari tiga pengujian fungsi reducer.
- Terdapat lebih dari tiga pengujian fungsi thunks.
- Terdapat lebih dari tiga pengujian pada React Component.
- Memiliki minimal 2 stories komponen.
- Menerapkan saran pada submission sebelumnya, seperti:
    - fitur votes pada thread dan komentar;
    - menampilkan leaderboard; dan
    - filter daftar thread berdasarkan kategori.
- Saran lainnya.
    - Aplikasi yang Anda bangun mudah untuk digunakan. Contohnya, tidak membuat pengguna bingung dan menggunakan warna yang mudah dalam membaca teks.
    - Aplikasi yang Anda bangun memiliki tampilkan yang menarik.

Berikut adalah detail penilaian submission:

&starf;:
Semua ketentuan wajib terpenuhi, tetapi terdapat indikasi kecurangan dalam mengerjakan submission.

&starf;&starf;:
Semua ketentuan wajib terpenuhi, tetapi terdapat kekurangan pada penulisan kode. Seperti tidak menerapkan modularization atau gaya penulisan tidak konsisten.

&starf;&starf;&starf;:
Semua ketentuan wajib terpenuhi, tetapi tidak terdapat improvisasi atau persyaratan opsional yang dipenuhi.

&starf;&starf;&starf;&starf;:
Semua ketentuan wajib terpenuhi dan menerapkan minimal tiga poin saran di atas.

&starf;&starf;&starf;&starf;&starf;:
Semua ketentuan wajib terpenuhi dan menerapkan seluruh saran di atas.

## Ketentuan Berkas Submission
- Berkas submission yang dikirim merupakan folder proyek dari Aplikasi Forum Diskusi dalam bentuk ZIP. 
- Folder yang dikirim merupakan proyek React yang di-render menggunakan react-dom bukan react-native.
- Hapus folder node_modules ke dalam berkas ZIP. Karena akan membuat berkas ZIP memiliki ukuran yang besar dan fitur code review tidak dapat berfungsi.
- Anda boleh menambahkan berkas aset seperti gambar selama aset tersebut digunakan pada proyek Anda.

## Submission Anda akan Ditolak Bila
- Kriteria utama tidak terpenuhi.
- Ketentuan berkas submission tidak terpenuhi.
- Menggunakan framework atau UI library selain React.
- Mengirimkan kode JavaScript yang telah di-minify.
- Melakukan kecurangan seperti tindakan plagiasi.