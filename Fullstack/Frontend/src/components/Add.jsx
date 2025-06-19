import React, { useState } from 'react'
import {BeatLoader} from 'react-spinners'
import ExtendForm from './ExtendForm'

const initialTaskForm = {name:'',desc:'',status:'',dueDate:''}

const Add = () => {
  return (
    <ExtendForm FormText={'Add new task'} api={{method:'POST',url:'https://task-manager-todo.onrender.com/api/tasks/task-post'}} type={'Add Task'}/>
  )
}
export default Add
