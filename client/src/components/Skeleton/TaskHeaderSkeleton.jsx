import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskHeaderSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
          <Skeleton height={40} containerClassName="flex-1" />
          <Skeleton height={40} width={40} />
        </div>
        <Skeleton height={40} className="mt-6" />
      </div>
    </div>
  );
};

export default TaskHeaderSkeleton;
