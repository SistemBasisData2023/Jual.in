# Jual.in
Website Jual-Beli Barang Bekas

<p align ="center">
  <a href="#contributors">Contributors</a> •
  <a href="#overview">Overview</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#language-and-tools">Language and Tools</a> •
</p>

## Contributors
Project made by group R18  :

- [Bisma Alif Alghifari](https://github.com/bismalif) - 2106731402
- [Muhammad Zaki Nur Said Hanan](https://github.com/ZakiHan) - 2106733856
- [Enricco Verindra Putra] - 2106651793


## Overview
Jual.in adalah platform e-commerce inovatif yang memungkinkan pengguna menjual dan membeli barang bekas dengan mudah. Dengan fitur review yang kuat, pengguna dapat memberikan ulasan dan penilaian terhadap transaksi, membangun kepercayaan dalam jual beli. Jual.in juga menawarkan keamanan dan perlindungan, serta antarmuka yang ramah pengguna untuk pengalaman belanja yang nyaman.

Feature yang dimiliki:

- 
- Login, Register, dan Logout: Fitur ini memungkinkan pengguna untuk membuat akun baru, masuk ke akun yang sudah ada, dan keluar dari akun mereka.
- Add Items: Fitur ini memungkinkan pengguna untuk menambahkan barang yang akan dijual ke dalam platform Jual.in.
- Item Details: Fitur ini menampilkan informasi detail mengenai suatu barang, seperti deskripsi, harga, kondisi, dan gambar.
- Rating & Review: Fitur ini memungkinkan pengguna untuk memberikan ulasan dan penilaian terhadap barang yang dibeli atau penjual yang melakukan transaksi dengan mereka.
- History: Fitur ini memungkinkan pengguna untuk melihat riwayat transaksi yang mereka lakukan, baik sebagai pembeli maupun penjual.
- Top up: Fitur ini memungkinkan pengguna untuk melakukan pengisian saldo atau top up ke akun mereka, yang dapat digunakan untuk melakukan transaksi di Jual.in.
- Change Password: Fitur ini memungkinkan pengguna untuk mengubah kata sandi (password) akun mereka untuk keamanan tambahan.
- Search: Fitur ini memungkinkan pengguna untuk mencari barang yang spesifik berdasarkan kata kunci tertentu.
- Filter by Category: Fitur ini memungkinkan pengguna untuk menyaring barang berdasarkan kategori tertentu, seperti elektronik, fashion, atau peralatan rumah tangga.

## Language and Tools

<p align="left"> <a href="https://firebase.google.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" alt="firebase" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

## Tables

### 1.  ```Item```
Atribut dari Item:
```
1. item_id
2. name
3. description
4. price
5. image_url
6. category_id
7.  quantity
```

### 2.  ```Users```
This table is used to store doctor information when registering on the website.
```
1. user_id
2. username
3. password_hash
4. email
5. role
6. balance
```

### 3.  ```Category```
This table is used to store doctors and patients account information. 
```
1. category_id
2. name
```

### 4.  ```UserItem```
This table is used to store appointment information when patients make appointments.
```
1. user_id
2. item_id
```

### 5.  ```Reviews```
This table is used to store schedule information when doctors input their schedule.
```
1. review_id
2. user_id
3. item_id
4. rating
5. comment
```

### 6.  ```Transaction```
This table is used to store departments name and their ID.
```
1. transaction_id
2. user_id
3. total_amount
4. timestamp
```

### 7.  ```Cart```
This table is used to store departments name and their ID.
```
1. transaction_id
2. item_id
3. quantity
```




