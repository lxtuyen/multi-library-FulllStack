//layout

import Home from '~/pages/Home';
import Following from '~/pages/Followed';
import Register from '~/pages/Register';
import Book from '~/pages/Book';
import SearchType from '~/pages/SearchType';
import Login from '~/pages/Login';
import User from '~/pages/User';
import Admin from '../pages/Home/Admin';
import Chat from '../pages/Chat';
import ReadingHistory from '~/pages/ReadingHistory';

const publicRoutes = [
    {path: '/', component: Home},
    {path: '/followed/:id', component: Following}, 
    {path: '/history/:id', component: ReadingHistory}, 
    {path: '/books/:id', component: Book },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/search', component: SearchType},
    {path: '/chatbot/:id', component: Chat},
    {path: '/user/:id', component: User},
]
const privareRoutes = [
    {path: '/', component: Admin},
]
export {publicRoutes, privareRoutes}