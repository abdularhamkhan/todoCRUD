import React from 'react'
import { Link } from 'react-router-dom'
import { MdEdit } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";
import supabase from '../config/supabaseClient';

// import EditIcon from '@mui/icons-material/Edit';

const TodoCard = ({ todo, onDelete }) => {

    const handleDelete = async () => {

        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', todo.id)
            .select()

        if (error) {
            console.log(error)
        }
        if (data) {
            onDelete(todo.id)
        }

    }

    return (
        <div className="todo-card">
            <h1 className='task'>{todo.task}</h1>
            <p>{todo.description}</p>
            <div className="satisfaction">{todo.satisfaction}</div>
            <div className="buttons">
                <Link to={"/" + todo.id}>
                    <MdEdit className="material-icons" />
                </Link>
                <MdDeleteSweep className="material-icons" id='deleteIcon' onClick={handleDelete} />

            </div>
        </div>
    )
}

export default TodoCard