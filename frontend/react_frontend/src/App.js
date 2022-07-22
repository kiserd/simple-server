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
    console.log('name: ', name);
    const endpoint = `/data/${name}`;
    const res = await axios.delete(endpoint);
    const getRes = await axios.get('/all');
    setTasks(getRes.data);
  }

  const updateTask = async (e, name, done) => {
    e.preventDefault();
    const payload = {[name]: !done}
    const postRes = await axios.post('/data', payload);
    const tasks = await axios.get('/all');
    setTasks(tasks.data);
  }

  const addTask = async (e) => {
    e.preventDefault();
    const task = e.target.elements.name.value;
    console.log('task: ', task);
    const payload = {
      [task]: 0
    }
    const postRes = await axios.post('/data', payload);
    const tasks = await axios.get('/all');
    setTasks(tasks.data);
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
          <Button style='btn-dft' text='Add' onClick={toggleForm} />
        :
          <TaskForm onSubmit={addTask} toggleForm={toggleForm} />
        }
        {tasks.map((task) => {
          return (
            <div className='card-dft card-todo'>
              <div className='px-2 text-custom-text-primary'>
                {task.name}
              </div>
              <div className='px-2'>
                <input type='checkbox' checked={task.done == 1 ? true : false} onChange={(e) => updateTask(e, task.name, task.done)} />
              </div>
              <div className='px-2 text-custom-error' onClick={(e) => deleteTask(e, task.name)}>
                <DeleteIcon />
              </div>
            </div>
          )
        })}

      </div>
  );
}

export default App;
