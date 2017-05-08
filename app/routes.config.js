import Main from './containers.v1/Main';
import Dashboard from './containers.v1/Dashboard';
import List from './containers.v1/List';

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
]

export default routes;