FROM node:18.3.0

ADD . /opt/app
WORKDIR /opt/app

RUN npm install --omit=dev

CMD npx prisma@^3.15.2 migrate deploy && npm start
