var server = require('http').createServer();
var io = require('socket.io')(server); // MUST use npm socket.io at v.2.3.0
var port = 5000;

var ai_uuid;

io.on('connection', function(socket){

  console.log('Client connected socket.id : ' + socket.id);
        
  socket.emit('response', 'OK');
  socket.emit('hstoai', 'ping');

    /* -- ########### [Python script client connection] ########### -- */
    socket.on('ai', function(ai_id){
      console.log('[AI client connected] >> ' + socket.id + ' | client name/id. : ' + ai_id);
      ai_uuid = socket.id;
    });

    socket.on('disconnect', function(){
      console.log('Client DISCONNECTED id = ' + socket.id);
    });
    /* ------------------------------------------------------- */

    /* ----------------------------- EVENT ---------------------------------- */
    socket.on('hstonodejs', function(data){
        console.log('[HS from AI] : ' + data);
        setTimeout(function(){
            io.to(ai_uuid).emit('hstoai', 'ping');
        }, 2000);
    });

});

server.listen(port, function(){
  console.log('socket protocol running on port ' + port);
});
