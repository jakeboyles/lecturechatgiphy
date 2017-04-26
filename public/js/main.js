var socket = io();

$('.message').submit((e)=>{
  e.preventDefault();
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});

$('.name').submit((e)=>{
  e.preventDefault();
  socket.emit('name',$('#n').val());
  $(".name").remove();
  $(".message").removeClass('hide');
})

socket.on('new message', (msg)=>{
  $('#messages').append(`<li>${msg.msg}</li>`);
  $("body").scrollTop($("body")[0].scrollHeight+52);
});

socket.on('got error',msg=>{
  alert(msg);
})