import React, { lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';

const HomePage = lazy(() => import(/* webpackChunkName: "home-page" */ '../pages/HomePage'));
const ArticlePage = lazy(() => import(/* webpackChunkName: "article-page" */ '../pages/ArticlePage'));
const SearchPage = lazy(() => import(/* webpackChunkName: "search-page"*/ '../pages/SearchPage'));
const CreateArticlePage = lazy(() => import(/* webpackChunkName: "create-article-page"*/ '../pages/CreateArticlePage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: (
      <h2>
        page 404 <Link to={'/'}>go home</Link>
      </h2>
    ),
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'article/:id',
        element: <ArticlePage />,
      },
      { path: 'search/:title', element: <SearchPage /> },
      { path: 'add-article', element: <CreateArticlePage /> },
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
