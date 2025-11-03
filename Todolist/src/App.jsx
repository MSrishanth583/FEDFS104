
import { useState } from 'react'
function App() {
  const [tasks, setTasks]=useState([]);
  const [taskText,setTaskText]=useState("");
  const [taskDate,setTaskDate]=useState("");
  const [taskTime,setTaskTime]=useState("");

  useEffect(()=>{
    const savedTasks=JSON.parse(localStorage.getItem("task"))||[];
    setTasks(savedTasks);
  },[]);

  //Add Task
  const addTask=(e)=>{
    e.preventDefault();
    if(taskText.trim()=== ""||taskDate.trim()===""||taskTime.trim()==="")
      return;
    const newTask={
      id:Date.now(),
      task:taskText,
      date:taskDate,
      time:taskTime,
      completed:false,
    };
    setTasks([...tasks,newTask]);
    setTaskText("");
    setTaskDate("");
    setTaskTime("");
  }
 
  return(
    <div>
      
      <h1>To-Do Tasks List</h1>
      <form onSubmit={addTask}>
        <input type="text"  placeholder="enter the task" />
        <input type='date'/>
        <input type= 'time'/>
        <button type="submit">Add Task</button>
        </form>
        <ul>
          {tasks.map((task)=>(
            <li></li>
            
          ))}
        </ul>
    </div>
  )
}
export default App