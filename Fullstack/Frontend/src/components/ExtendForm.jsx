import React, { useState } from 'react'
import {BeatLoader} from 'react-spinners'

const initialTaskForm = {name:'',desc:'',status:'',dueDate:''}

const ExtendForm = (props) => {

    const {api,type,FormText} = props
    const {method,url} = api

    const [taskForm,setTaskForm] = useState(initialTaskForm)
    const [apiState,setApistate] = useState(false)
    const [returnMessage,setReturnMessage] = useState({state:false,message:''})



    const closeMessage = () => {
        setTimeout(() => {
        setReturnMessage({state:false,message:''})
        }, 3000);
    }

    const postFormDetails = async () => {
        setApistate(true)
        setTaskForm(initialTaskForm)
        try {
            const taskData = {title:taskForm.name,description:taskForm.desc,status:taskForm.status,DueDate:taskForm.dueDate}
            // console.log(method,url,taskData)
            const opt1 = {
                method,
                headers:{
                'Content-Type':'application/json'
                },
                body:JSON.stringify(taskData)
            }
            const response = await fetch(url,opt1)
            const data = await response.json()
            if(response.ok){
                setTaskForm(initialTaskForm)
                setReturnMessage({state:true,message:data.message})
                closeMessage()
            }
            else{
                console.log(data.message)
                throw new Error(data.message)
            }
        
        } catch (error) {
        setReturnMessage({state:true,message:error.message})
        closeMessage()
        }finally{
        setApistate(false)
        }

    }

    const changeInpVal = (e,payload) => {
        setTaskForm({...taskForm,[payload]: e.target.value})
    }

    const submitFormDetails = event => {
        event.preventDefault()
        postFormDetails()
    }


    return (
        <div className='edit-task-container'>
        <div className={`error-message ${returnMessage.state ? 'show-error-message' : ''}`}>
            <h4>{returnMessage.message}</h4>
        </div>
        <h2 className='edit-task-header'>{FormText}</h2>
        <div className='form-container'>
            {apiState && <div className='loader'> <BeatLoader size={25}/> </div>}
            <form onSubmit={submitFormDetails} className={`form ${apiState ? 'hide-form' : ''}`}>
                <label htmlFor='taskname'>Task Name</label>
                <input value={taskForm.name} onChange={(e) => changeInpVal(e,'name')}  placeholder='Enter task name' id='taskname' type='text'/>

                <label htmlFor='desc'>Description</label>
                <textarea value={taskForm.desc} onChange={(e) => changeInpVal(e,'desc')} placeholder='Enter task details' rows={'5'} cols={'5'} id="desc"></textarea>

                <label htmlFor='status'>Status</label>
                <select value={taskForm.status} onChange={(e) => changeInpVal(e,'status')} id='status'>
                <option>todo</option>
                <option>in_progress</option>
                <option>done</option>
                </select>
                <label id='due-date'>Due date</label>
                <input value={taskForm.dueDate} onChange={(e) => changeInpVal(e,'dueDate')} type='date'/>
                <button className='update-task'>{type}</button>
            </form>  
        </div>
        </div>
    )
}

export default ExtendForm
