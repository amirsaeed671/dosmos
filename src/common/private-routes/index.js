import Home from 'home';
import Gallery from 'gallery';

const privateRoutes = [
    {
        title: 'Home',
        key: 'home',
        component: Home,
        path: '/home',
    },

    {
        title: 'Gallery',
        key: 'gallery',
        component: Gallery,
        path: '/gallery',
    },
];

export {privateRoutes};
