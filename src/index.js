import ReactDOM from 'react-dom/client';
import './index.css';
import Home from './Components/Home';
import BlogList from './Components/BlogList';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './utils/store';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from './utils/ProtectedRoute';
import NewBlogForm from './Components/NewBlogForm';
import Blogdetail from './Components/Blogdetail';
import UserProfile from './Components/UserProfile';
import AdminPanel from './Components/AdminPanel';
import AdminLoginForm from './Components/AdminLoginForm';
import ProtectedAdmin from './utils/ProtectedAdmin';
import ResetPassword from './Components/ResetPassword';
import LoginPage from './Pages/LoginPage';
import AboutPage from './Pages/AboutPage';
import MembersPage from './Pages/MembersPage';
import EventPage from './Pages/EventPage';
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path:"/About",
    element:<AboutPage />
  },
  {
    path:'/Members',
    element:<MembersPage />
  },
  {
    path:"/Events",
    element:<EventPage />
  },
  {
    path:"/Login",
    element:<LoginPage />,
  },
  {
    path: "/blogs",
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
    element: (<ProtectedRoute><Blogdetail/></ProtectedRoute>)
  },
  {
    path: "/blogspot/userProfile",
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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
       <RouterProvider router={appRouter} />
  </Provider>
);

reportWebVitals();
