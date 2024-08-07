import { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState('')
  const [description, setDescription] = useState('')
  const [satisfaction, setSatisfaction] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!task || !description || !satisfaction) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('todos')
      .update({ task, method, rating })
      .eq('id', id)
      .select()


    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }




  }

  useEffect(() => {
    const fetchTodo = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        navigate('/', { replace: true })
      }
      if (data) {
        setTask(data.task)
        setDescription(data.description)
        setSatisfaction(data.satisfaction)
      }
    }

    fetchTodo()
  }, [id, navigate])

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">task:</label>
        <input
          type="text"
          id="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label htmlFor="satisfaction">Satisfaction:</label>
        <input
          type="number"
          id="satisfaction"
          value={satisfaction}
          onChange={(e) => setSatisfaction(e.target.value)}
        />

        <button>Update Todo</button>
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Update