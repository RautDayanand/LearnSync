import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'


import SignUp from './components/SignUp.jsx'
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './components/Home.jsx'
import TodoApp from './components/Todo/TodoApp.jsx'
import TimerScreen from './components/Timer/TimerScreen.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<TimerScreen/>} >
      <Route index element={<SignUp />} />
      <Route path='signup' element={<SignUp />} />
      <Route path='login' element={<Login />} />
      <Route path='Home' element={<Home />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

