const restify = require('restify');

const server = require('restify').createServer();
const color = require('node-colorify');
const routes = require('../src/routes');

server.use(restify.plugins.jsonBodyParser({ mapParams: true }));
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.fullResponse());

//server.use(restify.fullResponse())


// routes
server.get('/todos', routes.getAllTodos);
server.post('/addTodo', routes.addTodo);
server.put('/updateTodo/:id', routes.updateTodo);
server.del('/removeTodo/:id', routes.removeTodo);


server.listen(3050, '127.0.0.1', () => {
  console.log(
    color.colorItSync(`REST server running at ${server.url}`, { 'fColor': 'green' })
  );
});
