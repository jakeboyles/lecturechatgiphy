const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const giphy = require('giphy')('dc6zaTOxFJmzC');

const port = process.env.port || 3000;

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket)=>{

  socket.on('chat message',(msg)=>{

  	if(!msg || msg=="") return socket.emit('got error', {error:"Please Enter a message"});

  	giphy.search({q:msg},(error,gifs)=>{
  		if(error || gifs.data.length === 0) return socket.emit('got error', {error:error});
  		let gif = gifs.data[0].images.fixed_height.url;
  		io.emit('new message', {msg:`<span class="name">${socket.name}</span>${msg} <img class="gifs" src='${gif}'>`});
  	});
  
  });

  socket.on('name',(msg)=>{
    socket.name = msg;
    return;    
  });
  
});


http.listen(port, function(){
  console.log('listening on '+port);
});
    