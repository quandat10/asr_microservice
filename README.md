# Build an API Gateway ASR Microservice
## 1. Kiến trúc :
  ![Alt text](https://github.com/quandat10/asr_microservice/blob/main/Screenshot%202022-06-08%20091654.png)
## 2. Mô tả :  
  - Xây dựng hệ thống api gateway kết nối hệ thống main api(hệ thống s2t) và upload api
  - Hệ thống hỗ trợ chuẩn đầu vào, xử lý văn bản để tăng độ chính xác trong mô hình học máy s2t
  - Cung cấp Api hỗ trợ xử lý đầu vào và kết quả của đoạn Audio trong phần mềm ứng dụng quản lý cuộc họp
## 3. Công nghệ : 
  - Framework :
    + Nestjs
    + Expressjs
    + FastApi
  - Database :
    + Mysql
    + Redis
  - Quản trị database :
    + phpAdmin
  - Trình đóng gói :
    + Docker
  - Message queue :
    + Rabbit MQ
    + Bull Redis
  - Stream :
    + Kafka
## 4. Khởi chạy : 
  - Docker
    ```bash
    $ cd docker
    $ docker-compose up -d
    ```
  - Backend
    ```bash
    $ yarn
    $ yarn start:dev
    ```
  - Worker
    ```bash
    $ yarn
    $ yarn dev-worker
    ```
