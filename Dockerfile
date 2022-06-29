FROM node:18.3.0

ADD . /opt/app
WORKDIR /opt/app

#ARG DATABASE_URL
ARG TG_BOT_TOKEN

#ENV DATABASE_URL $DATABASE_URL
ENV TG_BOT_TOKEN $TG_BOT_TOKEN

RUN npm install --omit=dev

CMD npx prisma@^3.15.2 migrate deploy && npm start
