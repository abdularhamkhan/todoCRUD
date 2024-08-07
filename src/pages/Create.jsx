import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
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
      .insert([{ task, description, satisfaction }])
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

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="task">Task:</label>
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
          max={5}
          min={1}
          id="satisfaction"
          value={satisfaction}
          onChange={(e) => setSatisfaction(e.target.value)}
        />

        <button>Create New Todo</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create