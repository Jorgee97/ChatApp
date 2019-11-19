# Chat App
A little chat application

# Steps to run this application
This application uses:
- Redis for session management
- Express.js
- Socket.io for realtime communication
- RabbitMQ as a boker for a bot that gets stocks from stooq.com
- Mongoose as the mongodb manager

Note: Make sure you have both Redis and RabbitMQ installed on your computer, or that you have a remote host where you can test.

## Database connection
For the connection with mongodb there are two ways:
1. Setting a **MONGO_URL** enviroment variable.
2. Create a file like this bellow one and change the connection string to match your database host.

```
{
    "connectionString": {
        "mongodb": "your string connection here"
    }
}
```
## Redis Connection
If you are running on localhost, you don't have to change anything, but if your redis server is on a remote host set the enviroment variable **REDIS_HOST**.

## Session Secret
Set the **SECRET** enviroment variable if you are using this on production.

## RabbitMQ Connection
The default connection is set to work with localhost, but again if your server is running remote set the **RABBIT_MQ** enviroment variable.
Please note that the connection string should look like this:
``` 
amqp://yourhosthere
```
## Running the application
```
  npm install // This will install all the necesary dependencies.
  npm run dev // Will run the server using nodemon in development mode.
```
# Mandatory Requirements Meet
- [x] Register and login of users.
- [x] Allow message commands such as: /stock=stock_code
- [x] Decoupled bot using RabbitMQ
- [x] Bot parses the CSV and return the stack in format “APPL.US quote is $93.42 per share”
- [x] Messages ordered by timestamp and limit is 50 messages

# Bonus
- [ ] Have more than a chat room
- [ ] Unit testing
- [x] Handle messages that are not understood by the bot.

