import React from 'react';
import Navbar from './Navbar';
import { Outlet, Link } from 'react-router-dom';
import Footer from './Footer';

function Home() {
  const cards = [
    {
      title: "TodoApp",
      text: "Manage your daily tasks efficiently and boost productivity.",
      label: "Open TodoApp",
      link: "/todo",
      icon: "bi-list-check"
    },
    {
      title: "View Tutorials",
      text: "Watch YouTube tutorials, learn new skills, and mark them as completed.",
      label: "Start Learning",
      link: "/tutorials",
      icon: "bi-play-circle"
    },
    {
      title: "Join Meeting",
      text: "Create or join online meetings and collaborate like Zoom or Google Meet.",
      label: "Join Meeting",
      link: "/meeting",
      icon: "bi-camera-video"
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="text-center bg-primary bg-gradient text-white py-5">
        <div className="container">
          <h1 className="display-4 fw-bold mb-3">Welcome to LearnSync Dashboard</h1>
          <p className="lead mb-4">
            Stay productive, learn efficiently, and connect seamlessly — all in one place.
          </p>
          <Link to="/todo" className="btn btn-light btn-lg shadow-sm px-4">
            Get Started
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container my-5">
        <div className="row g-4 justify-content-center">
          {cards.map((card, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-lg border-0">
                <div className="card-body text-center">
                  <i
                    className={`bi ${card.icon} text-primary mb-3`}
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <h5 className="card-title fw-bold">{card.title}</h5>
                  <p className="card-text text-muted">{card.text}</p>
                  <Link to={card.link} className="btn btn-outline-primary mt-2">
                    {card.label}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Outlet />
      <Footer />
    </>
  );
}

export default Home;
