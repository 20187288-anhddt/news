
## 1.	Tổng quan project

Project được chia thành 3 project con:
-	client: đảm nhiệm phần view, tương tác với server.
-	server: đảm nhiệm cho việc tương tác với database và logic nghiệp vụ.
-	crawler: crawl báo từ các nguồn báo khác nhau và đẩy vào database.

## 2.	Hướng dẫn cài đặt

### 2.1.	Server
Tạo file .env:
DATABASE_URL =
PORT=
 Chạy lần lượt các câu lệnh:
-	npm install
-	npm start

### 2.2.	Client
Chạy lần lượt các câu lệnh:
-	npm install
-	npm start

### 2.3.	Crawler
Tạo file .env:
SERVICE_URL=http://localhost:3000/
ADMIN_ID=[admin_id]
Chạy lần lượt các câu lệnh:
-	npm install
-	node main.js


