import { lazy } from 'react';

// project imports
import AuthGuard from 'utils/route-guard/AuthGuard';
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const CategoriesPage = Loadable(lazy(() => import('views/dllal/category')));
const AddDllal = Loadable(lazy(() => import('views/dllal/addDllal/AddDllal')));
const CategoryDetail = Loadable(lazy(() => import('views/dllal/category/CategoryDetails')));

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
            path: '/',
            element: <CategoriesPage />
        },
        {
            path: '/sample-page',
            element: <CategoriesPage />
        },
        {
            path: '/category/:name',
            element: <CategoryDetail />
        },
        {
            path: '/add',
            element: <AddDllal />
        }
    ]
};

export default MainRoutes;
