FROM node:14-alpine

LABEL Maintainer="Hieupv <hieu.pv@zetagroup.vn>" \
    Description="Lightweight container for nodejs application on Alpine Linux."

RUN apk add --update --no-cache git gcompat gettext

RUN apk add --no-cache tzdata
ENV TZ=Asia/Ho_Chi_Minh

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY . .

RUN yarn build

CMD ["node", "./dist/src/index-worker.js"]