import { resolvers } from '../resolvers/index.js';
import isAuthorized from '../middleware/auth.js';

const { getUser, Signup, Login, Profile } = resolvers;

const routes = (app) => {
  app.get('/', getUser);
  app.post('/signup', Signup);
  app.post('/login', Login);
  app.get('/profile', isAuthorized, Profile); // check to make sure the user is authorized
};

export default routes;
