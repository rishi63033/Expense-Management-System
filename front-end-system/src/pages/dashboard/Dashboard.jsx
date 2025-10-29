import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6">
          {/* Nested route content (Overview, Expenses, etc.) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
