import { useEffect, useState, useContext } from 'react';
import api from '../services/axios'; // fixed the incorrect "API" usage
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import TopNav from '../component/TopNav';

export default function TaskDashboard() {
  const { user } = useContext(AuthContext); // get logged in user
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login'); // redirect to login if not authenticated
      return;
    }
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      navigate('/login');
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/tasks', { title });
      setTasks([...tasks, res.data]);
      setTitle('');
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const task = tasks.find((t) => t._id === id);
      const res = await api.put(`/tasks/${id}`, { completed: !task.completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-[#fafafa]">
      <TopNav />
      <div className='flex flex-col items-center w-full h-full'>
          <h1 className="text-2xl font-bold mb-4 text-[#464545]">Your Tasks</h1>

          <div className="flex gap-2 mb-4 w-1/2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-[#a0a0a0] w-1/2 p-2 flex-1 rounded focus:outline-[#8b8b8b]"
              placeholder="New Task"
            />
            <button
              onClick={createTask}
              className="bg-blue-500 text-white px-4 rounded hover:bg-blue-400 transition"
            >
              Add
            </button>
        </div>

        {tasks.map((task) => (
            <div key={task._id} className="flex justify-between items-center p-2 border border-[#a0a0a0] w-1/2 rounded mb-2">
              <span className={task.completed ? 'line-through' : ''}>{task.title}</span>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task._id)}
                  className="bg-green-400 hover:bg-green-500 cursor-pointer px-2 text-white rounded"
                >
                  ✓
                </button>
                <button
                  onClick={() => deleteTask(task._id)}
                  className="bg-red-600 hover:bg-red-500 cursor-pointer px-2 py-1 text-white text-sm rounded"
                >
                  delete
                </button>
              </div>
            </div>
      ))}
      </div>



    </div>
  );
}
