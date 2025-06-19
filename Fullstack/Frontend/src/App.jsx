import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Home from './components/Home.jsx'
import Add from './components/Add.jsx'
import Edit from './components/Edit.jsx'
import './App.css'
import './style.css'

const router = createBrowserRouter([
  {
    path:'/',
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