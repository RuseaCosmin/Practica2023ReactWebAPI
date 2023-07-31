import { Counter } from "./components/Counter";
import FetchData from "./pages/FetchData.tsx";
import { Home } from "./components/Home";
import PostCategory from "./components/PostCategory.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";


const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/counter',
    element: <Counter />
  },
  {
    path: '/fetch-data',
      element: <FetchData /> 
   },
   {
     path: '/post-category',
     element: <PostCategory />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
        path: '/register',
        element: <RegisterPage />
    }
];

export default AppRoutes;
