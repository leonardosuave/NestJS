<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

## Validations request - DTO

Install class-validator and class-transformer

```bash
# install
$ npm i class-validator class-transformer
```

- Add new configuration in main.ts file
app.useGlobalPipes(new ValidationPipe());

This will validate in all aplication when use DTO, like a @Decorator beforer a data request

## Database

Install Postgresql database and ORM Prisma
```bash
# create docker database
$ docker-compose -f compose_db.yml up
```

Install ORM Prisma
```bash
# install ORM
$ npm i -D prisma

# to start app with a new database 
# will do the first configuration and add a files prisma (schema)
$ npx prisma init

#Creating tables
# 1 option - Create table in IDE line DBEAVER and after run the commands

# Will pull the table created and will build the table model in schema.prisma
$ prisma db pull

# This command need to be runed aways that model is edited. will update the PrismaClient()
$ prisma generate

# 2 option - Create table model and run by migrate
# In the file schema.prisma, create a model with the table config
# Run the command and write a name to migrate file
$ npx prisma migrate dev

# Create a prisma fold and create prisma.module.ts and prisma.service.ts
#In prisma.service.ts need to have the config to do connection with database and the config to close the connection with database (onModuleInit / enableShutdownHooks)
```

## Creating entity to a route

- Module
    Create a module
      Imports - In this array need to have all Entity modules in use by the module
        Ex: I create a user.module.ts to register user in database, to register in database i need use the Prisma, so i need to import PrismaMosule.
      Controllers: In this array need to have the class of the Controller in use, like UserController
      Providers: In this array need to have the class of the Services that are injectable in constructor of the Controller 
        In user.controller.ts the contructor of the class use the UserService, so to work i need to insert UserService in providers module.

- Controller
    Create a class and a method like create, insert method route decorate, Body and DTO to validate the body.
    Call the entity service to call the logic and the database if need.
    To use the service neeed to do the injectable in constructor class of Controller, like Angular. (constructor(private readonly userService: UserService){};).

- Service  
    Create a class with decorator @Injectable().
    In the constructor, pass the Services that the class will use, like a PrismaService to call the database (constructor(private readonly prisma: PrismaService){};).
    Create the method with the logic.


## Interceptor
  The interceptor are functions used to interceptor datas from a route and return something that you want in the response, like a execution time to the request. Work like a @Log() from Entergy.

- Create Interceptor
    Create a fold to interceptors and after a file .ts
    Create a class that are implements NestInterceptor, and after a method intercept with context and next params.
    In intercept write the logic to return with request's response.

- Using interceptors
  Interceptor can be applied in 3 different ways, all passing the decorator @UseInterceptors() and the parameter being the class with the created interceptor.
    1 - Specific route handler - Adds the decorator on top of each method, example route to create users ->@UseInterceptors(LogInterceptor).
    2 - In all controller methods - Adds the decorator in the same way, only next to the @Controller() decorator.
    3 - Global - Adds directly to the bootstrap function in main.ts, within the function to identify which app will be used, the interceptor -> app.useGlobalInterceptors(new LogInterceptor()).

## Middlewares
  The middlewares in NestJS working like Express, will pass beforer the controller if will do de check neccessary, if ok will go to controller, if not send error.
  - Create Middleware
    Create a file to the middleware, create a class that are implements "NestMiddleware", use the method "use" that received req, res and next params and in this method do the verify. Out of the method pass the "next()" to go to the controller if the success verifies.

  - Use middleware
    Go tho the module of the entity, like user.modules.ts and in the export class module pass the implements "NestModule" and a method "configure" with params "consume" that are a "MiddlewareConsumer" type. In this method "consume" are a object and using consume.apply() pass the class middleware creare with the logic that want to use in the entity.
    The are the option to specific routes using .forRoutes() or specific route that not want to use the middleware using .exclude().

## Guards
  The Guards are used to verify if can or not access routes, its used to verify if user are authenticated or has permission to access the routes. (Like middleware), returning true or false only. 
  The Guards are created to verify only one things, to verify more things you need to create more guards and do the verify separately.
  Ex: auth-guards.ts verify if token is valid and if valid return user infos.
      auth-status-guard.ts verify if token is valid and return true or false. (fastest route to verify if token in use already valid and if false need create a new token).

  - Create guards
    Create the class implements CanActive from @nestjs/cammon;
    Add contructor() if neccessary import a service to do the verify.
    add method canActivate(context: ExecutionContext) and this method will have the logic to verify if guards can be tru or false.

## Custom Param Decorator
  The Customer Param Decorator are @Decorators that receive the Request data and can be validate before call a service
  - Create
    Create a file with a export const, this const need to call a createParamDecorator() function from @nestjs/common that call another callback with 2 params.
      First param is a param sended when import the final Decorator in the controller, can be a string, object, array.
      Second param is the context, type from ExecutionContext from @nestjs/common and this context can capture the datas sended in the Resquest, like a token send to the Guard, filter there and return the user infos and after capture in Custom Decorator and done a new filter, like return only the datas received in the first params. 

