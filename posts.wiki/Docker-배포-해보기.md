```
# 1. 환경 설치
FROM node

# 2. 만든사람 표시
MAINTAINER peter.cho@kakaocorp.com

# 3. 코드 카피. 저장소의 코드를 app폴더로 이동
COPY ./ /usr/src/app

# 4. 실행 디렉토리 설정
WORKDIR /usr/src/app

# 5. 패키지 설치
RUN npm i

# 6. 패키지 설치
RUN npm run build

# 7. IP 개방 및 포트 개방
ENV HOST 0.0.0.0
EXPOSE 3000

# 8. docker run 할 때 실행할 명령어
CMD npm run start
```

```
docker build -t my-docker-image ./
docker run -p 3000:3000 my-docker-image
docker stop
```