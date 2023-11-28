//layout

import Home from '~/pages/Home';
import Following from '~/pages/Followed';
import Register from '~/pages/Register';
import Book from '~/pages/Book';
import SearchType from '~/pages/SearchType';
import Login from '~/pages/Login';
import User from '~/pages/User';
import Chat from '../pages/Chat';
import ReadingHistory from '~/pages/ReadingHistory';
//layout

import Dashboard from 'admin/pages/Dashboard';
import AllBooks from 'admin/pages/AllBooks';
import AddBook from 'admin/pages/AddBook';
import AllUsers from 'admin/pages/AllUsers';
import EditBook from 'admin/pages/UpdateBook';
const publicRoutes = [
    {path: '/', component: Home},
    {path: '/followed/:id', component: Following}, 
    {path: '/history/:id', component: ReadingHistory}, 
    {path: '/books/:id', component: Book },
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path:'/search', component: SearchType},
    {path: '/chatbot/:id', component: Chat},
    {path: '/user/:id', component: User},
]
const privareRoutes = [
    {path: '/', component: Dashboard},
    {path: '/allbooks', component: AllBooks},
    {path: '/addbook', component: AddBook},
    {path: '/editbook/:id', component: EditBook},
    {path: '/users', component: AllUsers}
]
export {publicRoutes, privareRoutes}