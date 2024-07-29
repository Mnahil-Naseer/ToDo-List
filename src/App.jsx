import NavBar from "./components/NavBar"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowfinished] = useState(true)
  const saveTodoLS=(e) => {
   localStorage.setItem("todos",JSON.stringify(todos)) 
  }
  
  const handleEdit = (e, id) => { 
    let t = todos.filter(i=>i.id===id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item=>{
      return item.id!== id
    })
    setTodos(newTodos)
    saveTodoLS()
  }
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id!== id
    })
    setTodos(newTodos)
    saveTodoLS()
  }
  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isComplete: false }])
    setTodo("")
    saveTodoLS()
  }
  const handleChnage = (e) => {
    setTodo(e.target.value)
  }
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isComplete = !newTodos[index].isComplete;
    setTodos(newTodos)
    saveTodoLS()
  }
  useEffect(() => {
    let todosString=localStorage.getItem("todos")
    if(todosString){
      let todos= JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  useEffect(() => {
    saveTodoLS();
  }, [todos]);
  const togglefinished=(e) => {
    setshowfinished(!showfinished)
  }
  
  

  return (
    <>
      <NavBar />
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5  bg-teal-100 md:w-1/2 min-h-[80vh]">
        <div className="addtodo my-5 flex-col">
          <h2 className="text-lg font-bold font-serif my-2">Add To-Do</h2>
          <input name={todo.id} onChange={(e)=>{handleChnage(e)}} value={todo} type="text" className="w-full" id="newtodo" />
          <button onClick={handleAdd} disabled={todo.length<3} className="bg-teal-400 m-5 px-4 py-1 rounded-md hover:bg-teal-600  hover:rounded-lg hover:transition-shadow">Save</button></div>
          <input id="show" onChange={togglefinished} type="checkbox" checked={showfinished} /><label htmlFor="show">  Show Finished Tasks </label>
          <div className="h-[1px] bg-black opacity-40" />
          <h2 className="font-bold text-xl my-6">Your Task</h2>
        <div className="todos ">
          {todos.length===0 && <div className="md:my-20 mx-32 text-l justify-center  text-slate-400">No Todo's to display</div>}
          {todos.map(item => {
            return(showfinished || !item.isComplete) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between" >
              <div className="flex gap-5">
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isComplete} id="" />
              <div className={item.isComplete ? "line-through" : ""}> {item.todo}</div>
              </div>
              <div className="btn flex h-full">
                <button onClick={(e)=>{handleEdit(e,item.id)}} className="bg-teal-400 mx-1 px-2 py-1 rounded-md hover:bg-teal-600 text-sm text-white hover:rounded-lg hover:transition-shadow" > <FaRegEdit /> </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className="bg-teal-400 mx-1 px-2 py-1 rounded-md hover:bg-teal-600 text-sm text-white hover:rounded-lg hover:transition-shadow" > <MdOutlineDeleteOutline /> </button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
