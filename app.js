var app = require('./config/server');

var server = app.listen(80, function(){
    console.log('server online...');
});

//criar instancia de conexão por websocket
var io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', function(socket) {
    console.log('Usuário Conectou');
    socket.on('disconnect', function() {
        console.log('O usuario Desconectou');
    });

    socket.on('msgParaServidor', function(data){
        //dialogo
        socket.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.msg});
        socket.broadcast.emit('msgParaCliente', {apelido: data.apelido, mensagem: data.msg});
        //participantes
        if(parseInt(data.apelido_participante) == 0){
            socket.emit('participanteParaCliente', {apelido: data.apelido});
            socket.broadcast.emit('participanteParaCliente', {apelido: data.apelido});
        }
    });
})  