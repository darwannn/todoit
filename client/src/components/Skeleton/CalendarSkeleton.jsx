import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CalendarSkeleton = () => {
  return (
    <div className="flex flex-col gap-5 h-full p-10">
      <div className="flex justify-between">
        <Skeleton height={40} width={200} />
        <Skeleton height={40} width={400} />
      </div>
      <div className="flex-1 ">
        <Skeleton className="h-full" />
      </div>
    </div>
  );
};

export default CalendarSkeleton;
