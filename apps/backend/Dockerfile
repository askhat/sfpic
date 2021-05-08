FROM node:16
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY ./ ./
RUN yarn
ENTRYPOINT yarn run build
CMD yarn run start:prod