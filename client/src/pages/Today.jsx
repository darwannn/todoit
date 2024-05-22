import { useTodayTasks } from "../services/taskService";
import Task from "../components/Task/Task";

const Today = () => {
  const { data: tasks, isPending } = useTodayTasks();
  const tasksData = tasks?.data.tasks;

  return (
    <>
      <Task url="today" tasks={tasksData} title="Today" isPending={isPending} />
    </>
  );
};

export default Today;
