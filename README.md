# Waterline RabbitMQ simple Adapter

RabbitMQ Adapter for Sails and Waterline ([AMQP 0.9](https://www.rabbitmq.com/amqp-0-9-1-reference.html)).
it is based on sails-rabbitmq I had to modify to fit our needs, there's just a simple PUSH.

## Install
```sh
$ npm install sails-rabbitmq-simple --save
```

## Configure

### 1. Setup Connection

```js
// config/connections.js
module.exports.connections = {
  rabbitCluster: {
    adapter: 'sails-rabbitmq-simple',

    /**
     * The url of your rabbitmq installation
     */
    url: 'amqp://localhost:5672',

    /**
     * Define how persistence is managed. 'true' will subscribe to all queues
     * and persist models that are published as messages. 'false' will do
     * nothing. This lets you turn off the persistence worker feature on the
     * Sails.js web server, and enable it in separate worker processes.
     */
    persistence: true
  }
};
```

### 2. Setup Models

For Models that you'd like to be able to publish and subscribe to, add the
`sails-rabbitmq` connection to the relevant Models, and define a `routingKey`.

```js
// api/models/Message
module.exports = {
  connection: [ 'rabbitCluster' ],
  queueName: 'nameOfTheQueue', //if not there will use the collection name
  attributes: {
    title: 'string',
    body: 'string',
    stream: {
      model: 'stream'
    },
    parentMessage: {
      model: 'message'
    }
    // ...
  }
};

```js
{
  title: 'yo dawg',
  body: 'I heard you like messages',
  stream: 'random',
  parentMessage: 1234
}
```


### `.create(values, callback)`

The `.create()` method can be called per usual on
RabbitMQ-enabled models. Waterline will do a push to the queue with your message.

## License
MIT


<img src='http://i.imgur.com/NsAdNdJ.png'>