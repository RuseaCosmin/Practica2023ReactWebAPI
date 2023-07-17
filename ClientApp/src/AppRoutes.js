import { Counter } from "./components/Counter";
import FetchData from "./components/FetchData.tsx";
import { Home } from "./components/Home";
import  PostCategory  from "./components/PostCategory.tsx";

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
   }
];

export default AppRoutes;
