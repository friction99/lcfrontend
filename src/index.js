import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import AboutPage from './Pages/AboutPage';
import EventPage from './Pages/EventPage';
import MembersPage from './Pages/MembersPage';
import BlogPage from './Pages/BlogPage';
import BlogList from './Components/BlogList';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './utils/store';
import {RouterProvider, createBrowserRouter} from "react-router-dom";
import ProtectedRoute from './utils/ProtectedRoute';
import NewBlogForm from './Components/NewBlogForm';
const appRouter = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/about",
      element: <AboutPage/>,
    },
    {
      path:"/Events",
      element: <EventPage/>,
    },
    {
      path:"/members",
      element: <MembersPage/>,
    },
    {
      path:"/blog",
      element: <BlogPage/>,
    },
    {
      path:"/blogspot",
      element: (
        <ProtectedRoute>
          <BlogList/>
        </ProtectedRoute>
      )
    },
    {
      path:"/newblog",
      element: <NewBlogForm/>,
    }
  ]
)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
      <RouterProvider router={appRouter}/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
