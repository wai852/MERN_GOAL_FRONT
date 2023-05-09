import { useEffect } from "react"
import { isRouteErrorResponse, useNavigate} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux"
import { getGoals, reset } from "../features/goals/goalSlice";
import { logout} from "../features/auth/authSlice";

import GoalForm from "../components/GoalForm";
import GoalItem from "../components/GoalItem";
import Spinner from "../components/Spinner";


function Dashboard(){
  //if user hasn't loggin, navigate to the login page
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get the user from the state.auth by using selector
  const {user} = useSelector((state) => state.auth);
  //can think about to change isErrorUser
  //get the goal
  const {goals, isError, isLoading, errorMessage} = useSelector((state) => state.goals);

  useEffect(() => {
    console.log(`Dash i fire once: ${Date.now()}`);
    //Currently if the key will expire in 30mins will be fine
    if (isError) {
      console.log(`Dash error : ${isError}`);
      console.log(errorMessage);
      dispatch(logout());
      navigate('/');
    }
    if (!user) {
      console.log("Dash error: User not found");
      navigate('/login')
    }
    //console.log("Dash : outside");
    //dispatch(getGoals())
    else if(!isError){
      console.log(`Dash error : ${isError}`);
      dispatch(getGoals())
    }
  }, [user, navigate, isError, errorMessage, dispatch])

  if(isLoading) {
    return <Spinner/>
  }

  return (
    <div>
    <section className="heading">
    <h1>Hi!{(user && user.username)}</h1>
    <p>Goal Dashboard</p>
    </section>
    <GoalForm/>
    <section className="content">
    {goals.length > 0 ?
    (
      <div className="goals">
        {goals.map((goal,i) =>{
          return <GoalItem 
          key = {i}
          id = {goal._id} 
          text = {goal.text}
          createdAt = {goal.createdAt}
          />
        })}
      </div>
      ):
      (
          <h3>You have not set any goals</h3>
      )
      }
    </section>
    </div>
  )
}


export default Dashboard