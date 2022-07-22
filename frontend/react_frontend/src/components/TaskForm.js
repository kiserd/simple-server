// library
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

// component
import TextInput from './TextInput';
import Button from './Button';

const TaskForm = ({ onSubmit, toggleForm }) => {
  return (
        <div className='card-dft card-form'>
            <form onSubmit={onSubmit}>
                <div className='mb-3'>
                    <TextInput label='New Task' name='name' />
                </div>
                <div className='flex flex-row items-center'>
                    <div className='basis-1/2'>
                        <button className='btn-dft' type='submit'>Add Task</button>
                    </div>
                    <div className='basis-1/2 flex justify-end text-custom-error'>
                        <div className='hover:bg-custom-hover rounded' onClick={toggleForm}>
                            <CloseIcon />
                        </div>
                    </div>
                </div>
            </form>
        </div>
  )
}

export default TaskForm