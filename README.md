# SFPic — easy and secure way to share files

SFPic is a web application built with React and NestJS and backed by CouchDB.

## Getting Started

__Live Demo is available at:__

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

An installation of NodeJS at least v10.16.3 and CouchDB v2.3.1 is required before proceeding to installing the web app.

Make sure following commands are executing correctly with similar output.

```
$ node -v
v10.16.3

$ yarn -v
1.21.1

$ curl http://127.0.0.1:5984
{"couchdb":"Welcome","version":"2.3.1"}
```

To get instructions on how to install software mentioned above hit following links for [NodeJS](https://nodejs.org/en/download/) and [CouchDB](https://docs.couchdb.org/en/stable/install/index.html).

_Alternatively you may want to use the [PouchDB](https://pouchdb.com) instead of CouchDB as a data storage for the app. However, if you thinking about that you probably don't require instructions._

### Installing

A step by step series of examples that tell you how to get a development env running.

Checkout the repository.

```
$ git clone git@github.com:askhat/sfpic.git
$ cd sfpic
```

Install JavaScript dependencies.

```
# recommended
$ yarn

# or
$ npm install
```

Finally run the web app and its backend in a separate terminal.

```
$ yarn run web
# new window
$ yarn run backend
```

If everything has been set correctly navigate to [http://localhost:1234](http://localhost:1234) to see the app in action.

## Deployment

- [ ] add notes

## Built With

* [TypeScript](https://github.com/microsoft/TypeScript)
* [Parcel Bundler](https://github.com/parcel-bundler/parcel)
* [React](https://github.com/facebook/react)
* [StyledComponents](https://github.com/styled-components/styled-components)
* [Axios](https://github.com/axios/axios)
* [CouchDB Nano](https://github.com/apache/couchdb-nano)
* [NestJS](https://github.com/nestjs/nest)
* [NodeJS](https://github.com/nodejs/node)
* [CouchDB](https://github.com/apache/couchdb)
* [Auth0](https://github.com/auth0/auth0-spa-js)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/askhat/sfpic/tags). 

## Authors

* **Askhat Bikmetov** - *Initial work* - [Askhat at GitHub](https://github.com/askhat)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

Special Thanks to [Swen Wenzel](https://github.com/swenzel) for providing [this gist](https://gist.github.com/swenzel/70beac153cdf23803f89) under a quite permissive licencese.
