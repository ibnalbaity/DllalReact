import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// sample page routing
const DllalPage = Loadable(lazy(() => import('views/dllal/dllals')));
const CategoriesPage = Loadable(lazy(() => import('views/dllal/category')));
const CategoryDetail = Loadable(lazy(() => import('views/dllal/category/CategoryDetails')));
const CitiesPage = Loadable(lazy(() => import('views/dllal/city')));
const CitiesDllals = Loadable(lazy(() => import('views/dllal/city/CitiesDllals')));
const DllalDetails = Loadable(lazy(() => import('views/dllal/DllalDetails')));
const DllalSearch = Loadable(lazy(() => import('views/dllal/search')));
const DllalSearchResults = Loadable(lazy(() => import('views/dllal/search/SearchResults')));
const ContactUs = Loadable(lazy(() => import('views/dllal/contactUs')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DllalPage />
        },
        {
            path: '/home',
            element: <DllalPage />
        },
        {
            path: '/categories',
            element: <CategoriesPage />
        },
        {
            path: '/category/:name',
            element: <CategoryDetail />
        },
        {
            path: '/city',
            element: <CitiesPage />
        },
        {
            path: '/city/:name',
            element: <CitiesDllals />
        },
        {
            path: '/dllal/:id',
            element: <DllalDetails />
        },
        {
            path: '/search',
            element: <DllalSearch />
        },
        {
            path: '/search/:searchWord',
            element: <DllalSearchResults />
        },
        {
            path: '/contactUs',
            element: <ContactUs />
        }
    ]
};

export default MainRoutes;
