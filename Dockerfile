FROM node:18.3.0

ADD . /opt/app
WORKDIR /opt/app

ARG DATABASE_URL
ARG TG_BOT_TOKEN

RUN npm install --production
RUN npx prisma@^3.15.2 migrate deploy

CMD ["npm", "start"]
