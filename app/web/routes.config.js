import Main from './containers/Main.web';
import Dashboard from './containers/Dashboard.web';
import List from './containers/List.web';

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