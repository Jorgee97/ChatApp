var amqp = require("amqplib/callback_api");
const { validateCommand, getStockCode, requestStock } = require('./fileManagement');

const RabbitConnection = "amqp://localhost" || process.env.RABBIT_MQ;

let ch = null;
const prefix = '/stock=';
module.exports = function(io) {
  amqp.connect(RabbitConnection, (err, connection) => {
    if (err) throw err; // Failing fast in case of error is found

    connection.createChannel((err1, channel) => {
      if (err1) throw err1;
      var queue = "stock";
    
      ch = channel;
      channel.assertQueue(queue, {
        durable: false
      });

      channel.consume(queue, msg => {
        let command = msg.content.toString();
        if (validateCommand(command, prefix)) {
            let stockCode = getStockCode(command, prefix);
            requestStock(stockCode, io);           
        }        
      }, {
          noAck: true
      });
    });
  });
};

// Whenever application is exited, we release the channel we created at the RabbitMQ server
process.on('exit', (code) => {
    ch.close();
    console.log('Closing RabbitMQ channel.');
})
