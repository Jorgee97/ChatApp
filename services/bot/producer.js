var amqp = require("amqplib/callback_api");

const RabbitConnection = "amqp://localhost" || process.env.RABBIT_MQ;
// Method to push messages from the user to the RabbitMQ queue
const producer = message => {
  amqp.connect(RabbitConnection, (err, connection) => {
    if (err) throw err;

    connection.createChannel((err1, channel) => {
      if (err1) throw err1;
      var queue = "stock";

      channel.assertQueue(queue, {
        durable: false 
      });

      channel.sendToQueue(queue, Buffer.from(message));
    });
  });
};

module.exports = {
    producer
}