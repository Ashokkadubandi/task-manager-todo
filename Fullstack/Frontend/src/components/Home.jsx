import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { BeatLoader } from 'react-spinners';

const Home = () => {
  const [taskList,setTaskList] = useState([])
  const [apiState,setApiState] = useState(false)
  const [deleteAction,setDeleteAction] = useState({state:false,id:'',apiState:false})
  const [mobileBar,setMobileBar] = useState('')
  
  const getAllTasks = async () => {
    console.log('called')
    setApiState(true)
    try {
      const response = await fetch('https://task-manager-todo.onrender.com/api/tasks')
      const data = await response.json()
      console.log(data)
      setTaskList(data.tasks)
      setApiState(false)
    } catch (error) {
      alert(error)
    }
  }

  const deleteTask = async () => {
    try {
      const opt = {method:'DELETE'}
      const response = await fetch(`https://task-manager-todo.onrender.com/api/tasks/${deleteAction.id}`,opt)
      const data = await response.json()
      if(response.ok){
        console.log(data)
        getAllTasks()
      }else{
        throw new Error(data.message)
      }
    } catch (error) {
      alert(error.message)
    }finally{
      setDeleteAction({state:false,id:'',apiState:false})
    }
  }

  const AlertdeleteCard = id => {
    setDeleteAction(prev => {return {
      ...prev,
      state:true,
      id,
    }})
  }

  const CancelDeleteAction = () => {
    setDeleteAction(prev => {
      return {
        ...prev,
        state:false,
        id:''
      }
    })
  }

  const ProceedDeleteAction = () => {
    setDeleteAction(pre => {
      return {
        ...pre,
        apiState:true
      }
    })
    deleteTask()
  }


  useEffect(() => {
    getAllTasks()
  },[])

  const renderAllTasks = () => {
    return (
      <ul className='ul-task-list'>
        {taskList.map(eachTask => {
          const {title,status,id} = eachTask
          return <li className='task-list' key={eachTask.id}>
            <h1 className='task-title'>{title}</h1>
            <div className='mobile-menu-bar' onClick={() => setMobileBar(id)}>
              <CiMenuKebab/>
            {mobileBar === id && 
              <div className='mobile-options-view'>
                <Link className='links' to={`/edit/${id}`}><span>Edit</span></Link>
                <span onClick={() => AlertdeleteCard(id)}>Delete</span>
              </div>
            }
            </div>
            <div className='status'>
              <p>{status}</p>
            </div>
            <Link className='edit-card' to={`/edit/${id}`}>
                <span>Edit</span>
                <MdOutlineEditNote fontSize={'30px'}/>
            </Link>
            <div className='delete-card'>
              <MdDeleteOutline onClick={() => AlertdeleteCard(id)} className='delete' fontSize={'25px'}/>
            </div>
          </li>
        })}
      </ul>
    )
  }

  return (
    <div className='home-tasks-container'>
      {deleteAction.state && <div className='delete-alert-card'>
        <h4>Are you sure want to DELETE</h4>
          {deleteAction.apiState && <BeatLoader size={15}/>}
          {deleteAction.apiState === false && 
          <>
          <span onClick={ProceedDeleteAction}>Yes</span>
          <span onClick={CancelDeleteAction}>No</span>
          </>}
      </div>}

      <Link to={'/add'}><button className='add-tasks'>New Task</button></Link>
      <div className='home-tasks'>
        {apiState ? <BeatLoader/> : renderAllTasks()}
      </div>
    </div>
  )
}

export default Home
