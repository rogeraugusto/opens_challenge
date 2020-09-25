# Opens - Backend Challenge

> An API code challenge proposed by [Opens](https://opens.com.br/), built with Node.js, Typescript and PostgreSQL

### **The Challenge**

###### Application Description
This application need to expose an API to authenticate, create, edit and delete users.

* It need be write in nodeJs and use a database.
* It need accept only authenticated requests and the master token need be the only one that create and delete users.
* The user credentials can edit and view your own data.

###### User Story
* The master token create a new user with basic data: login, password, name, email.
* The user can edit and view your data through an API request.
* The master token will delete the user.

## Dependencies

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/pt-BR/docs/install)
- [PostgreSQL](https://www.postgresql.org/download/linux/ubuntu/)
- [Insomnia](https://insomnia.rest/download/) - optional


## Getting started

To run the project:

1 - Clone the repo

```sh
https://github.com/rogeraugusto/opens_challenge
```

2 - Install the dependencies

```sh
yarn install
```

3 - Run Migrations:

```sh
yarn typeorm migration:run
```

4 - Run the project:

```sh
yarn dev:server
```

> be sure to have a postgres database running before run the migrations

## Testing

 - Import the Insomnia's Workspace requests file called `Insomnia_Requests.json` found on this project root folder
 - In order to abstract the logic of the master token, a simple route was created to add a user admin `POST - /users/admin`, which allows to create and delete users when authenticated
 - The Admin User can register a new user sending a request to `POST - /users` and delete an user, requesting to `DELETE - /users/:user_id`
 - The users can authenticate requesting to `POST - /sessions`. To view your data a request can be send to `GET - /profile`
 - The user profile can be updated sending a request to  `PUT - /profile`
 - Some validations was implemented on Services and Controllers

## Features

 - **DDD**
 - **SOLID Principles**
 - Object schema validation with **Joi**
 - Auth middleware with **JWT authentication**
