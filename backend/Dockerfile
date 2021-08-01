FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
COPY ./shared/ ./shared/
RUN npm run build:shared
COPY ./backend/ ./backend/
RUN npm run install:backend

CMD ["npm", "run", "start-prod:backend"]