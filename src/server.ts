import restify from 'restify';
import dotenv from 'dotenv';

dotenv.config();

const createServer = () => {
  const server = restify.createServer({
    name: 'tabcorp-test-server',
    version: '1.0.0'
  });

  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());

  require('./routes')(server);

  server.get('/', (req, res, next) => {
    res.send('Hello, Restify with TypeScript!');
    console.log('process.env.DB_USER>>>>>', process.env.DB_USER);
    return next();
  });

  server.listen(8080, () => {
    console.log('%s listening at %s', server.name, server.url);
  });

  return server;
};

export default createServer;
