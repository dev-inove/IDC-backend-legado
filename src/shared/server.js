const server = require('./app');

server.listen(process.env.SERVER_PORT,()=>{
    console.log(`O servidor está ativo na porta ${process.env.SERVER_PORT}!`);
});
