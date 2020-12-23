# Shopping Cart API

### What's in it for me ? :metal:

> This app has been created using Express,NodeMailer,HapiJoi,JsonWebToken and MongoDB as persistence manager.
> Hapi Joi helps in Parameter Validation
> NodeMailer helps in sending emails for password recovery.
> Authentication is provided by JsonWebToken

### Prerequisite

- create a .env file
- include DB_CONNECT (MongoDB URL from MongoDB server)
- PORT (API port where you want to run your server)
- TOKEN_SECRET (any gibberish string for JSON web tokens)
- API_VERSION (Version of your API)
- EMAIL (Gmail ID for NodeMailer)
- PASSWORD (Gmail's password)

## Run on LocalHost

- Clone the [repo](https://github.com/Iamsbharti/api-shopping.git)
- Run npm install
- Run npm run start-api
- API server will be launched at http://localhost:[PORT]

[Documentation](https://http://api.kanbanboard.co.in/)
