import React from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../services/authService'
import './HomePage.css'

function HomePage() {
  const navigate = useNavigate()
  const users = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@email.com',
      dob: 'March 15, 1990',
      status: 'active',
    },
    {
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      dob: 'July 22, 1985',
      status: 'deactivated',
    },
    {
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      dob: 'December 8, 1992',
      status: 'active',
    },
    {
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      dob: 'May 3, 1988',
      status: 'active',
    },
  ]

  const handleLogout = async () => {
    const token = localStorage.getItem('authToken')
    try {
      if (token) {
        await logout(token)
      }
    } catch (error) {
      // Optional: show error or log it
      // console.error('Logout failed', error)
    } finally {
      localStorage.removeItem('authToken')
      localStorage.removeItem('authEmail')
      localStorage.removeItem('authFullName')
      navigate('/login')
    }
  }

  return (
    <div className="home-root">
      <aside className="home-sidebar">
        <div className="home-sidebar-header">
          <div className="home-sidebar-logo">A</div>
          <div className="home-sidebar-title">AdminPanel</div>
        </div>

        <nav className="home-sidebar-nav">
          <div className="home-nav-item active">
            <span>User Management</span>
          </div>
          <div className="home-nav-item" onClick={handleLogout}>
            <span>Logout</span>
          </div>
        </nav>
      </aside>

      <main className="home-main">
        <header className="home-topbar">
          <div className="home-topbar-title">
            <h1>User Management</h1>
            <span>Manage system users and their permissions</span>
          </div>

          <div className="home-user-chip">
            <div className="home-user-avatar" />
            <span>Sarah Johnson</span>
          </div>
        </header>

        <section className="home-metrics">
          <div className="home-metric-card">
            <div className="home-metric-label">Total Users</div>
            <div className="home-metric-value-row">
              <div className="home-metric-value">1,247</div>
              <div className="home-metric-badge" />
            </div>
          </div>
          <div className="home-metric-card">
            <div className="home-metric-label">Active Users</div>
            <div className="home-metric-value-row">
              <div className="home-metric-value green">1,098</div>
              <div className="home-metric-badge" />
            </div>
          </div>
          <div className="home-metric-card">
            <div className="home-metric-label">Deactivated</div>
            <div className="home-metric-value-row">
              <div className="home-metric-value red">149</div>
              <div className="home-metric-badge" />
            </div>
          </div>
          <div className="home-metric-card">
            <div className="home-metric-label">New This Month</div>
            <div className="home-metric-value-row">
              <div className="home-metric-value blue">87</div>
              <div className="home-metric-badge" />
            </div>
          </div>
        </section>

        <section className="home-table-card">
          <div className="home-table-header">
            <div className="home-table-title">All Users</div>

            <div className="home-table-filters">
              <select className="home-select" defaultValue="all">
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="deactivated">Deactivated</option>
              </select>
              <input
                className="home-search"
                placeholder="Search by name or email..."
              />
            </div>
          </div>

          <table className="home-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Date of Birth</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dob}</td>
                  <td>
                    <span
                      className={`home-status-pill ${
                        user.status === 'active' ? 'green' : 'red'
                      }`}
                    >
                      <span className="home-status-dot" />
                      {user.status === 'active' ? 'Active' : 'Deactivated'}
                    </span>
                  </td>
                  <td>
                    <div className="home-actions">
                      <button className="home-action-btn" aria-label="Edit" />
                      <button
                        className="home-action-btn"
                        aria-label="Permissions"
                      />
                      <button
                        className="home-action-btn"
                        aria-label="Deactivate"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="home-table-footer">
            <span>Showing 1 to 4 of 1,247 results</span>

            <div className="home-pagination">
              <button className="home-page-btn">Previous</button>
              <button className="home-page-btn active">1</button>
              <button className="home-page-btn">2</button>
              <button className="home-page-btn">3</button>
              <button className="home-page-btn">Next</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default HomePage


