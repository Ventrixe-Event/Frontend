import React, { useState } from "react";
import {
  FaChartPie,
  FaCalendarAlt,
  FaTicketAlt,
  FaMusic,
  FaRunning,
  FaTshirt,
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
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
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
  
  // Custom day component to add highlights for events
  const CustomDay = ({ date, dayOfMonth }) => {
    // Example dates with events (would be dynamically populated in a real app)
    const datesWithEvents = [3, 10, 12, 14, 23];
    const hasEvent = datesWithEvents.includes(dayOfMonth);
    
    return (
      <div className={`custom-day ${hasEvent ? 'has-event' : ''}`}>
        {dayOfMonth}
      </div>
    );
  };
  return (
    <div className="dashboard-page">

      {/* Stats Cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-card-icon upcoming">
            <FaCalendarAlt />
          </div>
          <div className="stat-card-content">
            <h3>Upcoming Events</h3>
            <p className="stat-number">345</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon bookings">
            <FaTicketAlt />
          </div>
          <div className="stat-card-content">
            <h3>Total Bookings</h3>
            <p className="stat-number">1798</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-card-icon tickets">
            <FaTicketAlt />
          </div>
          <div className="stat-card-content">
            <h3>Tickets Sold</h3>
            <p className="stat-number">1250</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts-container">
        <div className="dashboard-chart ticket-sales">
          <div className="chart-header">
            <h3>Ticket Sales</h3>
            <div className="chart-period">
              <span>This Week</span>
              <span className="dropdown-arrow">▼</span>
            </div>
          </div>
          <div className="chart-content">
            <div className="donut-chart-container">
              <div className="donut-chart">
                <div className="donut-chart-center">
                  <p className="total-number">2,780</p>
                  <p className="total-label">Total Ticket</p>
                </div>
              </div>
            </div>
            <div className="ticket-status">
              <div className="ticket-status-item sold">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">Sold Out</p>
                  <p className="status-number">1,251</p>
                </div>
                <p className="status-percentage">45%</p>
              </div>
              <div className="ticket-status-item booked">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">Fully Booked</p>
                  <p className="status-number">834</p>
                </div>
                <p className="status-percentage">30%</p>
              </div>
              <div className="ticket-status-item available">
                <span className="status-dot"></span>
                <div className="status-info">
                  <p className="status-label">Available</p>
                  <p className="status-number">695</p>
                </div>
                <p className="status-percentage">25%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-chart sales-revenue">
          <div className="chart-header">
            <h3>Sales Revenue</h3>
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
      </div>

      {/* Popular Events */}
      <div className="popular-events-section">
        <div className="section-header">
          <h3>Popular Events</h3>
          <div className="dropdown">
            <span>Popular</span>
            <span className="dropdown-arrow">▼</span>
          </div>
        </div>
        <div className="popular-events-list">
          <div className="event-category-item">
            <div className="category-info">
              <h4>Music</h4>
              <div className="category-progress-bar">
                <div className="progress-fill" style={{ width: "40%" }}></div>
              </div>
            </div>
            <div className="category-stats">
              <span>40%</span>
              <span className="category-count">20,000 Events</span>
            </div>
          </div>
          <div className="event-category-item">
            <div className="category-info">
              <h4>Sports</h4>
              <div className="category-progress-bar">
                <div className="progress-fill" style={{ width: "35%" }}></div>
              </div>
            </div>
            <div className="category-stats">
              <span>35%</span>
              <span className="category-count">17,500 Events</span>
            </div>
          </div>
          <div className="event-category-item">
            <div className="category-info">
              <h4>Fashion</h4>
              <div className="category-progress-bar">
                <div className="progress-fill" style={{ width: "15%" }}></div>
              </div>
            </div>
            <div className="category-stats">
              <span>15%</span>
              <span className="category-count">12,500 Events</span>
            </div>
          </div>
        </div>
      </div>

      {/* All Events Section */}
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
              dayClassName={date => {
                const day = date.getDate();
                // Example dates with events
                const datesWithEvents = [3, 10, 12, 14, 23];
                return datesWithEvents.includes(day) ? 'highlighted-day' : undefined;
              }}
            />
          </div>
          <div className="upcoming-events">
            <h4>Upcoming Events</h4>
            <div className="upcoming-event-item">
              <div className="event-dot"></div>
              <div className="event-info">
                <p className="event-name">Music Festival</p>
                <p className="event-time">10:00 AM - 6:00 PM</p>
              </div>
            </div>
            <div className="upcoming-event-item">
              <div className="event-dot"></div>
              <div className="event-info">
                <p className="event-name">Tech Conference</p>
                <p className="event-time">09:30 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="all-events-section">
        <div className="section-header">
          <h3>All Events</h3>
          <button className="view-all-btn">View All Event</button>
        </div>
        <div className="events-grid">
          <div className="event-card">
            <div className="event-card-tag">Sport</div>
            <div className="event-card-content">
              <h4>Champions League Screening Night</h4>
              <p className="event-location">SkyDome Stadium, Toronto, ON</p>
              <div className="event-footer">
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>Apr 20, 2029</span>
                </div>
                <div className="event-price">$30</div>
              </div>
            </div>
          </div>
          <div className="event-card">
            <div className="event-card-tag">Food & Culinary</div>
            <div className="event-card-content">
              <h4>Culinary Delights Festival</h4>
              <p className="event-location">Gourmet Plaza, San Francisco, CA</p>
              <div className="event-footer">
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>Mar 3, 2029</span>
                </div>
                <div className="event-price">$40</div>
              </div>
            </div>
          </div>
          <div className="event-card">
            <div className="event-card-tag">Fashion</div>
            <div className="event-card-content">
              <h4>Artistry Unveiled: Modern Art Expo</h4>
              <p className="event-location">Vogue Hall, Los Angeles, CA</p>
              <div className="event-footer">
                <div className="event-date">
                  <FaCalendarAlt />
                  <span>Mar 10, 2029</span>
                </div>
                <div className="event-price">$110</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Recent Bookings Section */}
      <div className="recent-bookings-section">
        <div className="section-header">
          <h3>Recent Bookings</h3>
          <div className="bookings-search">
            <input type="text" placeholder="Search name, event, etc." />
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
                <th>Name</th>
                <th>Event</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>INV10011</td>
                <td>2029/02/15 10:30 AM</td>
                <td>Jackson Moore</td>
                <td>Symphony Under the Stars</td>
                <td>2</td>
                <td>$100</td>
                <td>
                  <span className="status-confirmed">Confirmed</span>
                </td>
              </tr>
              <tr>
                <td>INV10012</td>
                <td>2029/02/16 01:45 PM</td>
                <td>Alicia Smithson</td>
                <td>Runway Revolution 2024</td>
                <td>1</td>
                <td>$120</td>
                <td>
                  <span className="status-pending">Pending</span>
                </td>
              </tr>
              <tr>
                <td>INV10013</td>
                <td>2029/02/17 01:15 PM</td>
                <td>Marcus Rawless</td>
                <td>Global Wellness Summit</td>
                <td>3</td>
                <td>$240</td>
                <td>
                  <span className="status-confirmed">Confirmed</span>
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
                <strong>Admin Stefanus Weber</strong> reviewed a refund request
                for invoice ID: "INV1004"
              </p>
              <p className="activity-time">05:30 PM</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon ticket"></div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>Wells McGrath</strong> updated ticket prices for the
                event: "Runway Revolution 2024" under the category "Fashion"
              </p>
              <p className="activity-time">02:00 PM</p>
            </div>
          </div>
          <div className="activity-item">
            <div className="activity-icon cancel"></div>
            <div className="activity-content">
              <p className="activity-title">
                <strong>Patrick Cooper</strong> canceled a booking with invoice
                ID: "INV1014"
              </p>
              <p className="activity-time">01:45 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer removed as requested */}
    </div>
  );
};

export default Dashboard;
