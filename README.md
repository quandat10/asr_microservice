# Build an API Gateway ASR Microservice

## 1. Phiếu giao nhiệm vụ đồ án :
  https://docs.google.com/document/d/1HXJwo4Dp196VwqcIHYUrrQKfIKtS96ss/edit?rtpof=true
## 2. Kiến trúc :
  ![Alt text](https://github.com/quandat10/asr_microservice/blob/master/Screenshot%202022-06-08%20091654.png)
## 3. Mô tả :  
  - Xây dựng hệ thống api gateway kết nối hệ thống main api(hệ thống s2t) và upload api
  - Hệ thống hỗ trợ chuẩn đầu vào, xử lý văn bản để tăng độ chính xác trong mô hình học máy s2t
  - Cung cấp Api hỗ trợ xử lý đầu vào và kết quả của đoạn Audio trong phần mềm ứng dụng quản lý cuộc họp
## 4. Công nghệ : 
  - Framework :
    + Nestjs
    + Expressjs
    + Django
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
## 5. Khởi chạy : 
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
