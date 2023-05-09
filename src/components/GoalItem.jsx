import {useDispatch } from 'react-redux'
import {deleteGoal } from '../features/goals/goalSlice'
import {FaTrashAlt } from 'react-icons/fa'

function GoalItem(props) {
  const dispatch = useDispatch()


  return (
    <div className='goal'>
      <div>{new Date(props.createdAt).toLocaleString('en-US')}</div>
      <h2>{props.text}</h2>
      <button onClick={()=>{
        dispatch(deleteGoal(props.id));
      }} className='close'>
        <FaTrashAlt/>
      </button>
    </div>
  )
}

export default GoalItem