import { useNavigate } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useGetTasks } from "../services/taskService";

import "../assets/css/fullcalendar.css";
import CalendarSkeleton from "../components/Skeleton/CalendarSkeleton";

const Calendar = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetTasks();
  const tasks = data?.data.tasks.filter((task) => {
    return task.is_completed === 0;
  });

  const events = tasks?.map((task) => ({
    eventId: task.id,
    categoryId: task.category_id,
    title: task.title,
    start: task.due_at,
    end: task.due_at,
  }));

  const handleEventClick = (clickInfo) => {
    const data = clickInfo.event.extendedProps;
    navigate(`/list/${data.categoryId}/${data.eventId}`);
  };

  return (
    <div className="w-full min-h-screen z-10 ">
      {isError && <div>Error fetching tasks</div>}
      {isLoading ? (
        <>
          <CalendarSkeleton />
        </>
      ) : (
        <div className="  h-full w-full  p-10">
          <div className="min-h-[300px] h-full">
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              weekends={true}
              events={events}
              height={"100%"}
              editable={true}
              eventClick={handleEventClick}
              zIndex={1}
              eventColor="#FFD43B"
              eventTextColor="#000000"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
