# version of node to use
FROM node:10
# define working directory for docker
WORKDIR /usr/src/app
# copy all our source code into the working directory
COPY . .
# install npm dependencies
RUN npm install
# expose port 3000 for our server to run on
EXPOSE 3000
# command to start our server
CMD [ "npm", "run", "start" ]