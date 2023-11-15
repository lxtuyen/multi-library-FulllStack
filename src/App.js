import { Fragment, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/Components/Layout/DefaultLayout';
import AdminDefaultLayout from '~/Components/Layout/DefaultLayout/Admin';
import { AuthContext } from '~/context/AuthContext';
import { privareRoutes } from './routes';

function App() {
    const { user } = useContext(AuthContext);
    return (
        <Router>
        <div className="App">
            <Routes>
                {user?.role === 'admin' ? privareRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = AdminDefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                    
                                </Layout>
                            }
                        />
                    );
                }) : publicRoutes.map((route, index) => {
                    const Page = route.component;
                    let Layout = DefaultLayout;

                    if (route.layout) {
                        Layout = route.layout;
                    } else if (route.layout === null) {
                        Layout = Fragment;
                    }

                    return (
                        <Route
                            key={index}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </div>
    </Router>
    );
}

export default App;
