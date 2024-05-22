import { useParams } from "react-router-dom";
import { useCategoryTasks } from "../services/taskService";
import Task from "../components/Task/Task";

const Category = () => {
  const { categoryId } = useParams();
  const { data: category, isPending } = useCategoryTasks(categoryId);

  const tasksData = category?.data.tasks;

  return (
    <>
      <Task
        url={`list/${categoryId}`}
        tasks={tasksData}
        category={category?.data.category}
        title={category?.data.category?.title}
        isPending={isPending}
      />
    </>
  );
};

export default Category;
