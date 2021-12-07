FROM node:13.12.0-alpine
WORKDIR /app
COPY package-lock.json ./
COPY package.json ./
RUN npm install serve -g
COPY . ./
CMD ["npm","run","bin"]