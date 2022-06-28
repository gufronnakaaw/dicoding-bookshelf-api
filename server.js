import Hapi from '@hapi/hapi';
import routes from './routes/index.js';

const PORT = 5000;
async function init() {
  const server = Hapi.server({
    port: PORT,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
}

init();
