import Slider from "../components/Slider"
import TaskList from "../components/TaskList"

const Dashboard = () => {
  return (
    <div className="rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4"> Tasks </h1>
        <Slider/>

        <TaskList/>
    </div>
  )
}

export default Dashboard
