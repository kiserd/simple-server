// library
import axios from 'axios';
import { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

// component
import Button from './components/Button';
import TaskForm from './components/TaskForm';


function App() {
  const [tasks, setTasks] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    axios.get('/all').then((res) => {
      setTasks(res.data);
    })
  }, []);

  const deleteTask = async (e, name) => {
    e.preventDefault();
    const endpoint = `/data/${name}`;
    const res = await axios.delete(endpoint);
    // on success, update state without call to backend
    if (res.status === 200) {
      const { [name]: undefined, ...newTasks } = tasks;
      setTasks(newTasks);

    }
  }

  const updateTask = async (e, name, status) => {
    e.preventDefault();
    const payload = {[name]: status === "1" ? "0" : "1"}
    const res = await axios.post('/data', payload);
    // on success, update state without call to backend
    if (res.status === 200) {
      setTasks(tasks => { return {...tasks, [name]: payload[name]}; });
    }
  }

  const addTask = async (e) => {
    e.preventDefault();
    const task = e.target.elements.name.value;
    console.log('task: ', task);
    const payload = {
      [task]: '0'
    }
    const res = await axios.post('/data', payload);
    // on success, update state without call to backend
    if (res.status === 200) {
      setTasks(tasks => { return {...tasks, [task]: '0'}; });
    }
  }

  const toggleForm = (e) => {
    e.preventDefault();
    console.log('form toggle clicked');
    setFormOpen(!formOpen);
  }



  return (
      <div className='flex flex-col items-center'>
        {
          !formOpen
        ? 
          <Button styling='btn-dft' text='Add' onClick={toggleForm} />
        :
          <TaskForm onSubmit={addTask} toggleForm={toggleForm} />
        }
        {Object.keys(tasks).map((taskName) => {
          // define convenient var name to point to status value
          const taskStatus = tasks[taskName];
          return (
            <div key={taskName} className='card-dft card-task'>
              <div className='basis-3/4 px-2 text-custom-text-primary text-xl'>
                {taskName}
              </div>
              <div className='basis-1/8 px-2'>
                <input
                type='checkbox'
                checked={taskStatus === '1' ? true : false}
                onChange={(e) => updateTask(e, taskName, taskStatus)}
                />
              </div>
              <div
              className='basis-1/8 px-2 text-custom-error'
              onClick={(e) => deleteTask(e, taskName)}
              >
                <DeleteIcon />
              </div>
            </div>
          )
        })}

      </div>
  );
}

export default App;
