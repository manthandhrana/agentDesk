import Footer from "../../common/Footer";
import Navbar from "../../common/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Agent Task Distribution System</h1>
          <p className="hero-subtitle">
            Streamline your workflow with smart agent task management. Create agents, upload CSVs, and distribute tasks with ease.
          </p>
          <a href="/admin/login" className="hero-button">
            Get Started as Admin
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
