import { useUpcomingTasks } from "../services/taskService";
import Task from "../components/Task/Task";

const Upcoming = () => {
  const { data: tasks, isPending } = useUpcomingTasks();
  const tasksData = tasks?.data.tasks;

  return (
    <>
      <Task
        url="upcoming"
        tasks={tasksData}
        title="Upcoming"
        isPending={isPending}
      />
    </>
  );
};

export default Upcoming;
