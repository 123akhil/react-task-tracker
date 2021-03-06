import { useState, useEffect } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
// function way
function App() {
  const [showAddTask , setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
       const tasksFromServer = await fetchTasks()
       setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Add Task
  const addTask = async (task) => {

    const res = await fetch('`http://localhost:5000/tasks',{
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body:JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks,data])
      //  const id = Math.floor(Math.random() * 10000) + 1

      //  const newTask = { id , ...task}
      //  setTasks([...tasks,newTask])
  }

  //delete task
  const deleteTask = async (id) => {
     await fetch(`http://localhost:5000/tasks/${id}`, {
       method: 'DELETE',
      })
     //to change the mutable state we se setTasks
     setTasks(tasks.filter((task)=> task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? {...task, reminder:!task.reminder} : task)
    )
  }
  return (
    <div className="container">
       <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
       {showAddTask && <AddTask onAdd ={addTask}/>}
       {tasks.length > 0 ? (<Tasks tasks={tasks} onDelete={deleteTask} onToggle = {toggleReminder}/>): ('No Tasks to Show')}
    </div>

  );
}

//class way
// class App extends React.Component {
//   render () {
//     return <h1>
//       Hello from the class
//     </h1>
//   }
// }



export default App;
