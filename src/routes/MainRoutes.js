import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const UsersPage = Loadable(lazy(() => import('views/dllal/user')));
const AddDllal = Loadable(lazy(() => import('views/dllal/addDllal')));
const EditDllal = Loadable(lazy(() => import('views/dllal/editDllal')));
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/user',
            element: <UsersPage />
        },
        {
            path: '/user/:id',
            element: <UsersPage />
        },
        {
            path: '/add',
            element: <AddDllal />
        },
        {
            path: '/edit/:id',
            element: <EditDllal />
        }
    ]
};

export default MainRoutes;
