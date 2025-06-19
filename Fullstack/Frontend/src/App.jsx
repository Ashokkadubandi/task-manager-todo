import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/home'
import Add from './components/add'
import Edit from './components/Edit'
import './App.css'
import './style.css'

const router = createBrowserRouter([
  {
    path:'/home',
    element:<Home/>
  },{
    path:'/add',
    element:<Add/>
  },{
    path:'/edit/:id',
    element:<Edit/>
  }
])

const App = () => {
  return (
    <RouterProvider router={router}/>
  )
}

export default App