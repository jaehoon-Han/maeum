


![header](https://capsule-render.vercel.app/api?type=waving&text=마음연구소&animation=scaleIn&color=timeGradient&fontSize=50&height=200 )



### 📌 서버 실행 방법

#### 1. 서버 실행 전 .env 파일 내 환경 변수 수정
    - DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE (SERVER_PORT = 4000)
    
#### 2. 서버 실행 전 필요한 node_module 다운
    - npm i
    
#### 3.  "npm run start:dev" 명령어를 통해 서버 실행
    - npm run start:dev
</br>

### 📌 Quick Start

####  1. 서버 실행 후 도메인 'localhost:4000/graphql' 접속 후 하단의 쿼리 실행
  

```
 mutation {
  createUser(
    input: {
      email: "test@email.com",
      password: "testPassword",
      nickname: "testNickname"
    }
  ) {
    ok,
    message
  }
}
```
####  2. Return 값 확인
<a href="https://imgbb.com/"><img src="https://i.ibb.co/xsKr8wM/image.png" alt="image" border="0"></a>




</br>

### 📌사용 기술

- JavaScript
- TypeScript
- NestJs
- PostgreSQL
- TypeORM

</br>

#####  ⚡ 테이블 설계 시 
- Foreign Key를 이용해 중복 데이터의 생성을 방지하였습니다.
- 유일성을 가지기 위해 Unique값을 갖는 컬럼을 설정하였습니다.

#####  ⚡ 유저의 인증과 식별을 위해 JWT(Json Web Token)을 사용하였습니다.



</br>

![Footer](https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=200&section=footer)
