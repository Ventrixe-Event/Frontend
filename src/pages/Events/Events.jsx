import React, { useState } from "react";
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaTh,
  FaList,
} from "react-icons/fa";

const Events = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedMonth, setSelectedMonth] = useState("This Month");

  // Sample events data
  const [events] = useState([
    {
      id: 1,
      category: "Outdoor & Adventure",
      title: "Adventure Gear Show",
      date: "June 5, 2026",
      time: "5:00 PM",
      location: "Rocky Mountain Exhibition Hall, Denver, CO",
      status: "Active",
      progress: 65,
      price: 40,
      image: "/placeholder-outdoor.jpg",
    },
    {
      id: 2,
      category: "Music",
      title: "Symphony Under the Stars",
      date: "Apr 29, 2026",
      time: "7:00 PM",
      location: "Sunset Park, Los Angeles, CA",
      status: "Active",
      progress: 75,
      price: 50,
      image: "/placeholder-music.jpg",
    },
    {
      id: 3,
      category: "Fashion",
      title: "Runway Revolution 2029",
      date: "May 1, 2026",
      time: "6:00 PM",
      location: "Vogue Hall, New York, NY",
      status: "Active",
      progress: 50,
      price: 100,
      image: "/placeholder-fashion.jpg",
    },
    {
      id: 4,
      category: "Health & Wellness",
      title: "Global Wellness Summit",
      date: "May 5, 2026",
      time: "9:00 AM",
      location: "Wellness Arena, Miami, FL",
      status: "Active",
      progress: 40,
      price: 75,
      image: "/placeholder-health.jpg",
    },
    {
      id: 5,
      category: "Art & Design",
      title: "Artistry Unveiled Expo",
      date: "May 15, 2026",
      time: "10:00 AM",
      location: "Modern Art Gallery, Chicago, IL",
      status: "Active",
      progress: 85,
      price: 20,
      image: "/placeholder-art.jpg",
    },
    {
      id: 6,
      category: "Food & Culinary",
      title: "Culinary Delights Festival",
      date: "May 25, 2026",
      time: "11:00 AM",
      location: "Gourmet Plaza, San Francisco, CA",
      status: "Active",
      progress: 60,
      price: 45,
      image: "/placeholder-food.jpg",
    },
    {
      id: 7,
      category: "Music",
      title: "Echo Beats Festival",
      date: "May 29, 2026",
      time: "6:00 PM",
      location: "Sunset Park, Los Angeles, CA",
      status: "Active",
      progress: 70,
      price: 60,
      image: "/placeholder-music2.jpg",
    },
    {
      id: 8,
      category: "Technology",
      title: "Tech Future Expo",
      date: "June 1, 2026",
      time: "10:00 AM",
      location: "Silicon Valley, San Jose, CA",
      status: "Active",
      progress: 55,
      price: 80,
      image: "/placeholder-tech.jpg",
    },
  ]);

  const tabs = ["Active", "Draft", "Past"];
  const categories = [
    "All Category",
    "Outdoor & Adventure",
    "Music",
    "Fashion",
    "Health & Wellness",
    "Art & Design",
    "Food & Culinary",
    "Technology",
  ];
  const months = ["This Month", "Next Month", "This Year"];

  const filteredEvents = events.filter((event) => {
    const matchesTab =
      activeTab === "Active" ? event.status === "Active" : true;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Category" ||
      event.category === selectedCategory;
    return matchesTab && matchesSearch && matchesCategory;
  });

  const getProgressColor = (progress) => {
    if (progress >= 70) return "var(--primary-100)";
    if (progress >= 50) return "var(--yellow-100)";
    return "var(--secondary-100)";
  };

  return (
    <div className="events-page">
      {/* Header Controls */}
      <div className="events-header">
        <div className="events-tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`events-tab ${
                activeTab === tab ? "events-tab--active" : ""
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
              {tab === "Active" && <span className="tab-count">(8)</span>}
              {tab === "Draft" && <span className="tab-count">(2)</span>}
              {tab === "Past" && <span className="tab-count">(12)</span>}
            </button>
          ))}
        </div>

        <div className="events-controls">
          <div className="events-search">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search event, location, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button className="filter-btn">
            <FaFilter />
          </button>

          <div className="dropdown">
            <span>{selectedCategory}</span>
            <FaChevronDown />
          </div>

          <div className="dropdown">
            <span>{selectedMonth}</span>
            <FaChevronDown />
          </div>

          <div className="view-toggle">
            <button
              className={`view-btn ${
                viewMode === "grid" ? "view-btn--active" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <FaTh />
            </button>
            <button
              className={`view-btn ${
                viewMode === "list" ? "view-btn--active" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <FaList />
            </button>
          </div>
        </div>
      </div>

      {/* Events Grid */}
      <div
        className={`events-grid ${
          viewMode === "list" ? "events-grid--list" : ""
        }`}
      >
        {filteredEvents.map((event) => (
          <div key={event.id} className="event-card-new">
            <div className="event-card-header">
              <span className="event-category">{event.category}</span>
              <span className="event-status-badge">
                <span className="status-dot-active"></span>
                {event.status}
              </span>
            </div>

            <div className="event-card-image">
              {/* Placeholder for event image */}
            </div>

            <div className="event-card-content">
              <div className="event-meta">
                <span className="event-date-time">
                  {event.date} - {event.time}
                </span>
              </div>

              <h3 className="event-title">{event.title}</h3>

              <p className="event-location">{event.location}</p>

              <div className="event-details-visible">
                <div className="event-detail-row">
                  <span className="detail-label">Event ID:</span>
                  <span className="detail-value">
                    EVT{event.id.toString().padStart(4, "0")}
                  </span>
                </div>
                <div className="event-detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">{event.status}</span>
                </div>
                <div className="event-detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{event.category}</span>
                </div>
              </div>

              <div className="event-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${event.progress}%`,
                      backgroundColor: getProgressColor(event.progress),
                    }}
                  ></div>
                </div>
                <span className="progress-percentage">{event.progress}%</span>
              </div>

              <div className="event-footer">
                <span className="event-price">${event.price}</span>
                <div className="event-actions">
                  <button className="event-action-btn">Edit</button>
                  <button className="event-action-btn">View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="events-pagination">
        <span className="pagination-info">
          Showing {filteredEvents.length} out of {events.length}
        </span>
        <div className="pagination-controls">
          <button className="pagination-btn pagination-btn--prev">‹</button>
          <button className="pagination-btn pagination-btn--active">1</button>
          <button className="pagination-btn">2</button>
          <button className="pagination-btn">3</button>
          <span className="pagination-ellipsis">...</span>
          <button className="pagination-btn">8</button>
          <button className="pagination-btn pagination-btn--next">›</button>
        </div>
      </div>
    </div>
  );
};

export default Events;
