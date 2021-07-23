FROM node:14-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000
ENV TMDB_KEY=9de3455c46013a78dec2307813890f6f

CMD ["npm", "start"]