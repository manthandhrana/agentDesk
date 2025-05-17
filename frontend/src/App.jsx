import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import AdminLogin from '../pages/Auth/AdminLogin';
import AgentLogin from '../pages/Auth/AgentLogin';
import Home from '../pages/Home/Home';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AgentDashboard from '../pages/agent/AgentDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Agent Route */}
        <Route path="/agent/login" element={<AgentLogin />} />
        <Route path="/agent-dashboard" element={<AgentDashboard />} />

        {/* Optional: Dashboard or Home */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
