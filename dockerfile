FROM node:18.12.1
WORKDIR /pray2u_fe
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]