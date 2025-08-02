import TaskStatusFilter from "../components/TaskStatusFilter"

const Dashboard = () => {
  return (
    <div className="rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4"> Dashboard </h1>
        <div className="flex justify-between">
          <div className="w-1/3">
            <TaskStatusFilter/>
          </div>
          <div className="w-1/3"> To do</div>
          <div className="w-1/3"> To do</div>
        </div>
    </div>
  )
}

export default Dashboard
