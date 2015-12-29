import Router from 'react-router';
import routes from './routes';

export default Router.create({
    routes,
    location: Router.HistoryLocation
});
