// index.js
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import AboutPage from './Pages/AboutPage';
import EventPage from './Pages/EventPage';
import MembersPage from './Pages/MembersPage';
import BlogPage from './Pages/BlogPage';
import BlogList from './Components/BlogList';
import reportWebVitals from './reportWebVitals';
import { Provider, useDispatch } from 'react-redux';
import { store, persistor } from './utils/store';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './utils/ProtectedRoute';
import NewBlogForm from './Components/NewBlogForm';
import Blogdetail from './Components/Blogdetail';
import UserProfile from './Components/UserProfile';
import { PersistGate } from 'redux-persist/integration/react';
import AdminPanel from './Components/AdminPanel';
import AdminLoginForm from './Components/AdminLoginForm';
import ProtectedAdmin from './utils/ProtectedAdmin';
import ResetPassword from './Components/ResetPassword';
import { clearBlogState } from './utils/blogSlice';
import { clearAuthState } from './utils/authSlice';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/Events",
    element: <EventPage />,
  },
  {
    path: "/members",
    element: <MembersPage />,
  },
  {
    path: "/blog",
    element: <BlogPage />,
  },
  {
    path: "/blogspot",
    element: (
      <ProtectedRoute>
        <BlogList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/newblog",
    element: (
      <ProtectedRoute>
        <NewBlogForm />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/blogdetails/:id",
    element: <Blogdetail />,
  },
  {
    path: "/blogspot/userProfile/:id",
    element: (
      <ProtectedRoute>
        <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminpanel",
    element: (
      <ProtectedAdmin>
        <AdminPanel />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/login",
    element: <AdminLoginForm />,
  },
  {
    path: "/reset_password/:token",
    element: <ResetPassword/>
  }
]);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleBeforeUnload = () => {
      dispatch(clearBlogState());
      dispatch(clearAuthState());
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [dispatch]);

  return <RouterProvider router={appRouter} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);

reportWebVitals();
