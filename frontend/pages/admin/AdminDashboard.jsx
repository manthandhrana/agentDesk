import axios from "axios";
import { useEffect, useState } from "react";
import { FaFileCsv, FaTasks, FaUserPlus } from "react-icons/fa";
import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";
import "./AdminDashboard.css";

const api_url = import.meta.env.VITE_API_URL;

const AdminDashboard = () => {
  const [agentData, setAgentData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });
  const [csvFile, setCsvFile] = useState(null);
  const [agentTasks, setAgentTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  // Fetch agents with tasks
  const fetchAgentTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${api_url}/api/agent-tasks`, { withCredentials: true });
      setAgentTasks(res.data || []);
    } catch (error) {
      console.error("Failed to fetch agent tasks:", error);
      alert("Failed to fetch agent tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAgentTasks();
  }, []);



  // Handle input changes for agent form
  const handleChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value });
  };

  // Add Agent handler
  const handleAddAgent = async (e) => {
    e.preventDefault();

    // Basic validation 
    if (
      !agentData.name ||
      !agentData.email ||
      !agentData.mobile ||
      !agentData.password
    ) {
      return alert("Please fill all agent details");
    }

    try {
      await axios.post(`${api_url}/api/agents`, agentData, { withCredentials: true });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);

      setAgentData({ name: "", email: "", mobile: "", password: "" });
      fetchAgentTasks();
    } catch (error) {
      console.error("Failed to add agent:", error.response?.data || error);
      alert("Error adding agent: " + (error.response?.data?.message || error.message));
    }

  };

  // Upload CSV handler
  const handleUploadCSV = async (e) => {
    e.preventDefault();
    if (!csvFile) return alert("Please select a CSV or Excel file");

    const formData = new FormData();
    formData.append("file", csvFile);

    try {
      await axios.post(`${api_url}/api/upload-csv`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      setCsvFile(null);
      fetchAgentTasks();
    } catch (error) {
      console.error("CSV Upload Error:", error.response?.data || error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar />

      <main className="admin-content">
        <h2>Admin Dashboard</h2>

        <form onSubmit={handleAddAgent} className="form-section">
          {showPopup && (
            <div className="popup-success">
              Agent added successfully!
            </div>
          )}

          <h3><FaUserPlus /> Add New Agent</h3>
          <input
            type="text"
            name="name"
            value={agentData.name}
            onChange={handleChange}
            placeholder="Agent Name"
            required
          />
          <input
            type="email"
            name="email"
            value={agentData.email}
            onChange={handleChange}
            placeholder="Agent Email"
            required
          />
          <input
            type="text"
            name="mobile"
            value={agentData.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />
          <input
            type="password"
            name="password"
            value={agentData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button type="submit" className="btn-primary">Add Agent</button>
        </form>

        {/* Upload CSV Form */}
        <form onSubmit={handleUploadCSV} className="form-section">
          {showPopup && (
            <div className="popup-success">
              CSV Upload successfully!
            </div>
          )}
          <h3><FaFileCsv /> Upload Tasks CSV</h3>
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={(e) => setCsvFile(e.target.files[0])}
            required
          />
          <button type="submit" className="btn-primary">Upload CSV</button>
        </form>

        {/* Display agent tasks */}
        <section className="task-list-section">
          <h3><FaTasks /> Agents and Their Tasks</h3>
          {loading ? (
            <p>Loading...</p>
          ) : agentTasks.length === 0 ? (
            <p>No agents or tasks found.</p>
          ) : (
            agentTasks.map((agent, idx) => (
              <div key={idx} className="agent-card">
                <h4>{agent.agent}</h4> {/* agent name */}
                {agent.tasks?.length > 0 ? (
                  <ul>
                    {agent.tasks.map((task, i) => (
                      <li key={i}>{task.task}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks assigned.</p>
                )}
              </div>
            ))
          )}
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
