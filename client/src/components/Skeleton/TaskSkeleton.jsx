import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const TaskSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton height={40} width={40} />
          <Skeleton height={40} width={40} />
          <Skeleton height={40} containerClassName="flex-1" />
          {/* <Skeleton height={40} width={40} /> */}
        </div>
        {/* <Skeleton height={40} /> */}
        <Skeleton height={40} className="mt-6" />
        {/* <Skeleton height={40} className="mt-3" /> */}
        {/* <div className="flex gap-2 mt-3">
          <Skeleton height={30} width={130} />
          <Skeleton height={30} width={130} />
        </div> */}
        <div className="flex flex-col gap-2 mt-11">
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
          <Skeleton height={90} />
        </div>
      </div>
    </div>
  );
};

export default TaskSkeleton;
