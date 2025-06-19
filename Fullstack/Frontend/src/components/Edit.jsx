import React from 'react'
import { useParams } from 'react-router-dom'
import ExtendForm from './ExtendForm'

const initialTaskForm = {name:'',desc:'',status:'',dueDate:''}

const Edit = () => {
  const {id }= useParams()
  return (
    <ExtendForm FormText={'Edit Task'} api={{method:'PUT',url:`https://task-manager-todo.onrender.com/api/tasks/edit/${id}`}} type={'Update'}/>
  )
}

export default Edit
