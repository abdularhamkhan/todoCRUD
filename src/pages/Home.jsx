import { useState, useEffect } from "react"
import supabase from "../config/supabaseClient"
import TodoCard from "../components/TodoCard"



const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [todos, setTodos] = useState(null)


  const handleDelete = (id) => {
    setTodos (prevTodos => {
    return prevTodos.filter(tasks => tasks.id !== id)
    })
    }

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select()

      if (error) {
        setFetchError("Could not fetch the todos")
        setTodos(null)
        console.log(error)
      }
      if (data) {
        setTodos(data)
        setFetchError(null)
      }
    }
    fetchTodos()

  }, [])
  return (
    <div className="page home">
      {fetchError && (<p>{fetchError}</p>)}
      {todos && (<div className="todos">
        <div className="todo-grid">
          {
            todos.map(todo => (
              <TodoCard key={todo.id} todo={todo} onDelete={handleDelete}/>

            ))
          }

        </div>
      </div>)}
    </div>
  )
}

export default Home