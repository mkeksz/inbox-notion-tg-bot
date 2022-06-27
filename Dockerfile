FROM node:18.3.0

ADD . /opt/app
WORKDIR /opt/app

RUN npm install --production
RUN npx prisma@^3.15.2 migrate deploy

CMD ["npm", "start"]
