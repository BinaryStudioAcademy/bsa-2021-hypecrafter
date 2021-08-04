FROM node:14.17.1-alpine3.13
WORKDIR "/app/shared"
COPY --from=mihailts/hypecrafter-shared /app .
WORKDIR "/app/payment"
COPY . .
RUN npm install

CMD ["npm", "run", "start-prod"]