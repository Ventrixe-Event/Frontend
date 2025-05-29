import React, { useState } from "react";
import {
  FaChartPie,
  FaCalendarAlt,
  FaTicketAlt,
  FaFileInvoiceDollar,
  FaComments,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());

  // Format date for display in the custom header
  const formatMonth = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
    }).format(date);
  };

  // Custom header for the date picker to match the design in the image
  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="datepicker-header">
      <div className="datepicker-header-month">
        <span>{formatMonth(date)}</span>
        <button className="dropdown-arrow">▼</button>
      </div>
      <div className="datepicker-header-nav">
        <button
          onClick={decreaseMonth}
          disabled={prevMonthButtonDisabled}
          className="datepicker-nav-button"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={increaseMonth}
          disabled={nextMonthButtonDisabled}
          className="datepicker-nav-button"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );

  return (
    <div className="dashboard-page">
      {/* Stats Cards - Invoice and Feedback focused */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon bookings">
            <FaFileInvoiceDollar />
          </div>
          <div className="stat-card-content">
            <h3>Total Invoices</h3>
            <p className="stat-number">1,245</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon upcoming">
            <FaFileInvoiceDollar />
          </div>
          <div className="stat-card-content">
            <h3>Pending Invoices</h3>
            <p className="stat-number">87</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon tickets">
            <FaComments />
          </div>
          <div className="stat-card-content">
            <h3>Feedback Received</h3>
            <p className="stat-number">423</p>
          </div>
        </div>
      </div>

      {/* Charts Section - Revenue focused */}
      <div className="dashboard-charts-container">
        <div className="dashboard-chart sales-revenue">
          <div className="chart-header">
            <h3>Invoice Revenue</h3>
            <div className="chart-period">
              <span>Last 6 Months</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          <div className="chart-content">
            <div className="revenue-total">
              <h4>Total Revenue</h4>
              <p className="revenue-amount">$348,805</p>
            </div>
            <div className="bar-chart-container">
              {/* Placeholder for a bar chart */}
              <div className="bar-chart">
                <div className="bar-month">
                  <div className="bar" style={{ height: "60%" }}></div>
                  <span>Jan</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "40%" }}></div>
                  <span>Feb</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "50%" }}></div>
                  <span>Mar</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "80%" }}></div>
                  <span>Apr</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "60%" }}></div>
                  <span>May</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "50%" }}></div>
                  <span>Jun</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "40%" }}></div>
                  <span>Jul</span>
                </div>
                <div className="bar-month">
                  <div className="bar" style={{ height: "70%" }}></div>
                  <span>Aug</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-chart feedback-stats">
          <div className="chart-header">
            <h3>Feedback Overview</h3>
            <div className="chart-period">
              <span>This Month</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          <div className="chart-content">
            <div className="donut-chart-container">
              <div className="donut-chart">
                <div className="donut-chart-center">
                  <p className="total-number">4.2</p>
                  <p className="total-label">Avg Rating</p>
                </div>
              </div>
            </div>
            <div className="ticket-status">
              <div className="ticket-status-item sold">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">5 Stars</p>
                  <p className="status-number">234</p>
                </div>
                <p className="status-percentage">55%</p>
              </div>
              <div className="ticket-status-item booked">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">4 Stars</p>
                  <p className="status-number">128</p>
                </div>
                <p className="status-percentage">30%</p>
              </div>
              <div className="ticket-status-item available">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">3 Stars or Below</p>
                  <p className="status-number">61</p>
                </div>
                <p className="status-percentage">15%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="dashboard-flex-container">
        <div className="dashboard-calendar-section">
          <div className="section-header">
            <h3>Calendar</h3>
            <div className="dropdown">
              <span>Month View</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          <div className="calendar-container">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              renderCustomHeader={CustomHeader}
            />
          </div>
          <div className="upcoming-events">
            <h4>Invoice Due Dates</h4>
            <div className="upcoming-event-item">
              <div className="event-dot"></div>
              <div className="event-info">
                <p className="event-name">Invoice #INV-2024-001</p>
                <p className="event-time">Due: Tomorrow</p>
              </div>
            </div>
            <div className="upcoming-event-item">
              <div className="event-dot"></div>
              <div className="event-info">
                <p className="event-name">Invoice #INV-2024-005</p>
                <p className="event-time">Due: In 3 days</p>
              </div>
            </div>
          </div>
        </div>

        <div className="all-events-section">
          <div className="section-header">
            <h3>Recent Feedback</h3>
            <button className="view-all-btn">View All Feedback</button>
          </div>
          <div className="events-grid">
            <div className="event-card">
              <div className="event-card-tag">5 Stars</div>
              <div className="event-card-content">
                <h4>Great service and quality!</h4>
                <p className="event-location">Customer: John Doe</p>
                <div className="event-footer">
                  <div className="event-date">
                    <FaCalendarAlt />
                    <span>Apr 20, 2024</span>
                  </div>
                  <div className="event-price">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-card-tag">4 Stars</div>
              <div className="event-card-content">
                <h4>Good experience overall</h4>
                <p className="event-location">Customer: Jane Smith</p>
                <div className="event-footer">
                  <div className="event-date">
                    <FaCalendarAlt />
                    <span>Apr 19, 2024</span>
                  </div>
                  <div className="event-price">★★★★☆</div>
                </div>
              </div>
            </div>
            <div className="event-card">
              <div className="event-card-tag">5 Stars</div>
              <div className="event-card-content">
                <h4>Excellent customer support</h4>
                <p className="event-location">Customer: Mike Johnson</p>
                <div className="event-footer">
                  <div className="event-date">
                    <FaCalendarAlt />
                    <span>Apr 18, 2024</span>
                  </div>
                  <div className="event-price">★★★★★</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Section */}
      <div className="recent-bookings-section">
        <div className="section-header">
          <h3>Recent Invoices</h3>
          <div className="bookings-search">
            <input type="text" placeholder="Search invoice, customer, etc." />
            <div className="dropdown">
              <span>This Week</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
        </div>
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV-2024-001</td>
                <td>2024/04/15 10:30 AM</td>
                <td>Jackson Moore</td>
                <td>Service Package A</td>
                <td>$250</td>
                <td>
                  <span className="status-confirmed">Paid</span>
                </td>
              </tr>
              <tr>
                <td>INV-2024-002</td>
                <td>2024/04/16 01:45 PM</td>
                <td>Alicia Smithson</td>
                <td>Consultation Services</td>
                <td>$120</td>
                <td>
                  <span className="status-pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>INV-2024-003</td>
                <td>2024/04/17 01:15 PM</td>
                <td>Marcus Rawless</td>
                <td>Premium Package</td>
                <td>$480</td>
                <td>
                  <span className="status-confirmed">Paid</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="recent-activity-section">
        <div className="section-header">
          <h3>Recent Activity</h3>
          <button className="more-options">...</button>
        </div>
        <div className="activity-items">
          <div className="activity-item">
            <div className="activity-icon refund"></div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>Admin Sarah Wilson</strong> processed a refund request
                for invoice ID: "INV-2024-004"
              </p>
              <p className="activity-time">05:30 PM</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon ticket"></div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>John Feedback</strong> submitted new feedback with
                5-star rating for recent service
              </p>
              <p className="activity-time">02:00 PM</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon cancel"></div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>System</strong> sent payment reminder for invoice ID:
                "INV-2024-005"
              </p>
              <p className="activity-time">01:45 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
