import React from 'react'
import { useLocation } from 'react-router-dom'

const TodoView = () => {
    const location = useLocation()
    const {title,description,DueDate,status} = location.state
  return (
    <div className='todo-view-container'>
        <div className='todo-view-card'>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className='status-bg'>
                <p>{status}</p>
            </div>
            
        </div>
    </div>
  )
}

export default TodoView
