import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

const App = () => {
  return (
    <div className="flex">
      <Sidebar />

      <Outlet />
    </div>
  );
};
export default App;
