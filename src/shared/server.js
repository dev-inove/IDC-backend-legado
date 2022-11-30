const server = require('./app');

server.listen(process.env.SERVER_PORT,()=>{
    console.log(`Server ativo na porta ${process.env.SERVER_PORT}`);
});
