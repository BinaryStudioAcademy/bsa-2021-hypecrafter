FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
COPY ./shared/ ./shared/
RUN npm run build:shared
COPY ./gateway/ ./gateway/
RUN npm run install:gateway

CMD ["npm", "run", "start-prod:gateway"]