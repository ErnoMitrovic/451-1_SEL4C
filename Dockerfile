FROM node:18-alpine

WORKDIR /app/
COPY public/ /app/public
COPY src/ /app/src
COPY package.json /app/
RUN npm install

ENV REACT_APP_API_BASE_URL=http://ec2-54-183-198-5.us-west-1.compute.amazonaws.com/

EXPOSE 3000
CMD ["npm", "start"]


# To build and run container
# docker image build -t web-app:latest .
# docker run -p 3000:3000 --name web-app  web-app:latest

# To stop and remove
# docker rm web-app
# docker stop web-app
