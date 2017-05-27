import Main from './containers/Main';
import Dashboard from './containers/Dashboard';
import List from './containers/List';

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