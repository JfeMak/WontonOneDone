import React from "react"
import Navbar from "./components/Navbar"
import Task from "./components/Task"
import UpNext from "./components/UpNext"
import Categories from "./components/Categories"
import MainTask from "./components/MainTask"
import AddTask from "./components/AddTask"
import {nanoid} from "nanoid"
import BreakTime from "./components/BreakTime"

// Main app component

export default function App() {
  // Track all of the tasks data inputted by the user
  const [tasks, setTasks] = React.useState([])
  // Track the time the user spent on the main task
  const [mainTaskTime, setMainTaskTime] = React.useState(0)
  // Track the main task data
  const [mainTask, setMainTask] = React.useState({
    taskName : "None - Press the switch button!",
    time : [0, 0, 0],
    importance : 0,
    id: "-1"
  })
  // Track whether the user is taking a break or doing tasks
  const [breakTime, setBreakTime] = React.useState(false)
  // Track whether the user has switched on/off break times
  const [hasBreakTime, setHasBreakTime] = React.useState(true)
  // Track whether the user still has the default main task
  const [isMainTask, setIsMainTask] = React.useState(false)

  // Timer for the main task
  React.useEffect(() => {
    let intervalId;
    if (isMainTask) {
      intervalId = setInterval(() => setMainTaskTime(mainTaskTime + 1), 1000);
    }
    return () => clearInterval(intervalId);
  }, [isMainTask, mainTaskTime]);

  // Reset the timer
  function reset() {
    setMainTaskTime(0)
  }

  // Function for creating a new task with a given name, target time, and importance
  function createNewTask (nTaskName, nTime, nImportance) {
    const temp = nTime.split(":")
    const len = temp.length
    for (let i = 0; i < 3 - len; i++) {
      temp.push("0")
    }
    const timeArr = []
    for (let i = 0; i < temp.length; i++) {
      if(temp[i] === "") {
        timeArr.push("0")
      } else {
        timeArr.push(temp[i])
      }
    }

    const newTask = {
      id : nanoid(),
      taskName : nTaskName,
      time: timeArr,
      importance : nImportance
    }
    
    setTasks(prev => {
      const temp = [...prev, newTask]
      temp.sort(function(x,y) {
        if (parseInt(x.importance) > parseInt(y.importance)) {
          return -1;
        } else {
          return 1;
        }
      })
      return [...temp]
    })
  }

  // Function for changing the current main task to a new one
  function changeMainTask(nTaskName, nTime, nImportance, nId, done) {
    if (mainTask.id !== "-1" && !done) {
      createNewTask(mainTask.taskName, mainTask.time.join(":"), mainTask.importance)
    }
    if (nId !== "-1") {
      setIsMainTask(true)
    } else {
      setIsMainTask(false)
    }
    setMainTask({
      taskName : nTaskName,
      time : nTime,
      importance : nImportance,
      id : nId
    })
    reset()
  }

  // Function for deleting a task
  function deleteTask(event, taskId) {
    event.stopPropagation()
    setTasks(oldTasks => oldTasks.filter(task => task.id !== taskId))
  }

  // Mapping the array of task data to actual task elements to be displayed
  const taskElements = tasks.map((taskElement) => (
    <Task 
      id = {taskElement.id}
      key = {taskElement.id}
      task = {taskElement.taskName}
      time = {taskElement.time}
      importance = {taskElement.importance}
      changeMainTask = {changeMainTask}
      deleteTask = {deleteTask}
      breakTime = {breakTime}
    />
  ))

  
  // Display all components
  return (
    <div>
      <Navbar
        hasBreakTime = {hasBreakTime}
        setHasBreakTime = {setHasBreakTime}
      />
      <BreakTime
        breakTime = {breakTime}
        setBreakTime = {setBreakTime}
      />
      <Categories 
        breakTime = {breakTime}
      />
      <MainTask 
        hasBreakTime = {hasBreakTime}
        task = {mainTask.taskName}
        importance = {mainTask.importance}
        time = {mainTask.time}
        currentTime = {
          [
            ((mainTaskTime % 216000) / 3600) | 0,
            ((mainTaskTime % 3600) / 60) | 0,
            mainTaskTime % 60
          ]
        }
        changeMainTask = {changeMainTask}
        breakTime = {breakTime}
        setBreakTime = {setBreakTime}
        id = {mainTask.id}
      />
      <AddTask 
        createNewTask = {createNewTask}
        breakTime = {breakTime}
      />
      <UpNext 
        breakTime = {breakTime}
      />
      {taskElements}
    </div>
  );
}
