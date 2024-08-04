FROM node:lts AS runtime
WORKDIR /app


COPY package.json .

RUN npm install

COPY nombres nombres
COPY app.js .
COPY flag.txt .
COPY index.html .

EXPOSE 3001
ENV PORT=3001
ENV NODE_ENV=production
CMD npm start
