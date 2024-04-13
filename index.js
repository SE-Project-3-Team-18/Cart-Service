const app = require('./src/app') // the actual Express application
const http = require('http')
const config = require('./src/config/config')
const ServiceRegistryClient = require('./src/utils/serviceRegistry')
const server = http.createServer(app)

const serviceRegistryClientInstance = new ServiceRegistryClient();
serviceRegistryClientInstance.initialise().catch(error => {
  console.error('Failed to initialize service registry:', error);
});

server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
