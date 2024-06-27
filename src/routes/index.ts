import UserRoutes from '../user/user.routes';
import Auth from '../middlewares/auth';

const routes = [...UserRoutes];

module.exports = (server: any) => {
  routes.forEach((route) => {
    server[route.method](route.path, route.handler);
  });
};
