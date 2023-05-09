import {useState} from 'react'
import {useDispatch} from 'react-redux';
import {createGoal} from '../features/goals/goalSlice';

function GoalForm() {
    const [goal, setGoal] = useState({
      text:''
    })
  //create goal will dispatch here soon
  const dispatch = useDispatch();

  function handleOnChange(e){
        const {value, name } = e.target;
        setGoal(preValue => {
          return {
            ...preValue,
            [name]:value
          };
        });
    }
    function submitGoal(e){
        e.preventDefault();
        dispatch(createGoal(goal)); //maybe need to change here
        setGoal({text:""});
    }

  return (
    <section className='form'>
    <form className="form-group" onSubmit={submitGoal}>
    <textarea onChange = {handleOnChange} name="text" id="text" rows='3' placeholder="Text" value= {goal.text}/>
    <div className='form-group'>
    <button type="submit" className="btn btn-bloack">Add</button>
    </div>
    </form>
    </section>
  )
}

export default GoalForm