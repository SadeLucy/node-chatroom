var net = require('net');

var readline = require('readline');

var rl = readline.createInterface(process.stdin,process.stdout);

rl.question('what is your name?',(name)=>{
    name = name.trim();
    // 输入名字的时候连接服务端
    var server = net.connect({port:2080},()=>{
        console.log(`welcome ${name} to 2080 chart!!!`);
        
        
        // 监听server有数据过来
    server.on('data',(chunk)=>{
        // console.log(chunk.toString());
        try {
            var signal = JSON.parse(chunk.toString().trim());
            //chunk:{protocol:"broadcast",to:"user1",from:"user2",message:"who???"}
            var protocol = signal.protocol;
            switch (protocol) {
                case 'broadcast':
                    console.log('\nbroadcast['+signal.from+'] : '+signal.message);
                    rl.prompt();
                    break;
                default:
                    server.write('what do you think???');
                    break;
            }
        } catch (error) {
            server.write('HOW');
        }        
        
    });
        
        
        
        rl.setPrompt(`${name}  >  `);
    
        rl.prompt();
    
        rl.on('line',(line)=>{
            // console.log('1111111111111111');
            var send={
            from : name,
            message : line.toString().trim(),  
            protocol : 'broadcast'
            };
        
            server.write(JSON.stringify(send));
            
            rl.prompt(); 
       
        });
    })
    
   
});