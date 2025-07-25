import { Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import TaskDashboard from './pages/TaskDashboard';

function App() {
  return(
    <div>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/taskdashboard" element={<TaskDashboard />} />
      </Routes>
    </div>
  )
}

export default App;