var amqp = require("amqplib/callback_api");

// Method to push messages from the user to the RabbitMQ queue
const producer = message => {
  amqp.connect("amqp://localhost", (err, connection) => {
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