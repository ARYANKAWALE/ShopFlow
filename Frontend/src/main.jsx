import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Home from './components/ui/Home.jsx'
import Layout from './Layout.jsx'
import Products from './components/ui/Products.jsx'
import Login from './components/authentication/Login.jsx'
import Register from './components/authentication/Register.jsx'
import Collections from './components/ui/Collections.jsx'
import About from './components/ui/About.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Products />,
      },
      {
        path: "/collections",
        element: <Collections />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },{ path:"*", element: "<h1 className='text-red'>404 Not Found</h1>"}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
