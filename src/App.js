import { useState } from "react"
import Header from "./components/Header";
import Tasks from "./components/Tasks";

// function way
function App() {
    const [tasks, setTasks] = useState([
      {
          id: 1,
          text: 'akhil sdl',
          day: 'feb 5th at 2:30pm',
          reminder: true,
      },
      {
          id: 2,
          text: 'afsfhil sffdl',
          day: 'mar 6th at 2:40pm',
          reminder: true,
      },{
          id: 3,
          text: 'aksfsfhil sdffgl',
          day: 'apr 8th at 2:50pm',
          reminder: true,
      }
  ])

  //delete task
  const deleteTask= (id) => {
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
       <Header />
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
