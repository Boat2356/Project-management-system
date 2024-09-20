import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <Link className="navbar-brand" to="/admin">Admin Dashboard</Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/project-crud">Project CRUD</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/course-crud">Course CRUD</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/supervisor-crud">Supervisor CRUD</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin/user-crud">User CRUD</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
    );
}
export default Navbar;