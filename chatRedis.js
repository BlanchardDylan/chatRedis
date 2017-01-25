var Redis = require('ioredis');
var redis = new Redis();     //double utilisateur un pour subscribe l'autre publish 
var pub = new Redis();
var channel = 'chan01';
redis.subscribe(channel);

process.stdin.resume();			//stdin pour écouter l'entrée clavier de l'utilisateur
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (chunk) { 		//on stock le tout dans chunk 	
   message = chunk.toString().trim();			//on le transforme 
   pub.publish(channel, message);			//puis le publie 
})

redis.on('message', function (channel, message) {		//listener sur un message dans un channel subscribe
  console.log('Receive message %s from channel %s', message, channel);		//écriture du message selon le channel 
});