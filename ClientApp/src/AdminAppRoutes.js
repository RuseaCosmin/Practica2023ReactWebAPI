import { Counter } from "./components/Counter";
import FetchData from "./pages/FetchData.tsx";
import { Home } from "./components/Home";
import PostCategory from "./components/PostCategory.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";


const AdminAppRoutes = [
    {
        index: true,
        element: <AdminPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
];

export default AdminAppRoutes;
