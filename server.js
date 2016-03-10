var net = require('net');

var clients=[];
// 创建一个服务端
var server = net.createServer((socket)=>{
    clients.push(socket);
    console.log(`${socket.remoteAddress}:${socket.remotePort}进来了,当前在线人数${clients.length}`);
    
    // console.log(socket);
    function broadcast(signal) {
        // console.log(signal);
        var send={
          from : signal.from,
          message : signal.message,  
          protocol : signal.protocol,
        };
        clients.forEach(client=>{
            client.write(JSON.stringify(send));
        })
    }
    // 监听socket有数据过来
    socket.on('data',(chunk)=>{
        // console.log(chunk.toString());
        try {
            var signal = JSON.parse(chunk.toString().trim());
            //chunk:{protocol:"broadcast",to:"user1",from:"user2",message:"who???"}
            var protocol = signal.protocol;
            switch (protocol) {
                case 'broadcast':
                    broadcast(signal)
                    break;
                default:
                    socket.write('what do you think???');
                    break;
            }
        } catch (error) {
            socket.write('HOW');
            
        }        
        
    }).on('error',(err)=>{
        clients.splice(clients.indexOf(socket),1);
        console.log(`${socket.remoteAddress}下线了，当前在线人数${clients.length}`);
        
    })
    
});

var port = 2080;
server.listen({port:port},(err)=>{
    if (err) {
        throw err;
    }
    console.log(`成功监听${port}端口...`);
}) 