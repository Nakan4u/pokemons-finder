import Main from './containers/Main.native';
import Dashboard from './containers/Dashboard.native';
import List from './containers/List.native';

const routes = [
    {
        path: '/',
        exact: true,
        component: Main
    },
    {
        path: '/pokemon',
        component: Dashboard
    },
    {
        path: '/list',
        exact: true,
        component: List
    },
    {
        path: '/list/:type',
        component: List
    }
];

export default routes;
