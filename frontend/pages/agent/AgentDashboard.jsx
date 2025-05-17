import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { FaPhone, FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";
import "./agentDashboard.css";


const api_url = import.meta.env.VITE_API_URL


const AgentDashboard = () => {
  const [tasks, setTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();
  const token = Cookies.get("agentToken");

  // Redirect login if no token
  useEffect(() => {
    if (!token) {
      
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/agent/login";
      }, 1000);
    }
  }, [token, navigate]);

  // Fetch tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const resData = await axios.get(`${api_url}/api/my-tasks`, {
          withCredentials: true,
        });
        setTasks(resData.data.tasks);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
        Cookies.remove("agentToken");
        navigate("/agent/login");
      }
    };

    if (token) fetchTasks();
  }, [token, navigate]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2 className="dashboard-heading"><FaUserTie /> Agent Dashboard</h2>

         {showPopup && (
            <div className="popup-success">
              Please Login To Continue
            </div>
          )}

        {tasks.length > 0 ? (
          <div className="task-list">
            {tasks.map((task) => (
              <div className="task-card" key={task._id}>
                <h3>{task.task}</h3>
                <p><FaPhone /> {task.phone}</p>
                <p> Name : {task.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-tasks">No tasks assigned yet.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AgentDashboard;
