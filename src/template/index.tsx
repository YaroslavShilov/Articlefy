import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const Home = lazy(() => import(/* webpackChunkName: "home-page" */ '../pages/Home'));
const Article = lazy(() => import(/* webpackChunkName: "article-page" */ '../pages/Article'));
const Search = lazy(() => import(/* webpackChunkName: "search-page"*/ '../pages/Search'));
const CreateArticle = lazy(() => import(/* webpackChunkName: "create-article-page"*/ '../pages/CreateArticle'));
const Page404 = lazy(() => import(/* webpackChunkName: "page-404"*/ '../pages/Page404'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'article/:id',
        element: <Article />,
      },
      { path: 'search/:title', element: <Search /> },
      { path: 'add-article', element: <CreateArticle /> },
      { path: '*', element: <Page404 /> },
    ],
  },
]);

const root = createRoot(document.getElementById('root') as Element);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
