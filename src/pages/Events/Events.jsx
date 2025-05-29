import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaTh,
  FaList,
} from "react-icons/fa";
import { eventService } from "../../services/eventService";

const Events = () => {
  const [activeTab, setActiveTab] = useState("Active");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [selectedMonth, setSelectedMonth] = useState("This Month");

  // API related state
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await eventService.getAllEvents();

        if (result.success) {
          setEvents(result.data || []);
        } else {
          setError(result.error || "Failed to fetch events");
        }
      } catch (err) {
        setError("Network error: Unable to connect to the event service");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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
      activeTab === "Active"
        ? event.status === "Active" || event.isActive !== false
        : true;
    const matchesSearch =
      (event.title || event.name || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (event.location || "").toLowerCase().includes(searchTerm.toLowerCase());
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

  // Loading state
  if (loading) {
    return (
      <div className="events-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="events-page">
        <div className="error-container">
          <h3>Error Loading Events</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="retry-button"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

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
              <span className="event-category">
                {event.category || "General"}
              </span>
              <span className="event-status-badge">
                <span className="status-dot-active"></span>
                {event.status || "Active"}
              </span>
            </div>

            <div className="event-card-image">
              {/* Placeholder for event image */}
            </div>

            <div className="event-card-content">
              <div className="event-meta">
                <span className="event-date-time">
                  {event.date || event.startDate || "TBD"} -{" "}
                  {event.time || event.startTime || "TBD"}
                </span>
              </div>

              <h3 className="event-title">
                {event.title || event.name || "Untitled Event"}
              </h3>

              <p className="event-location">
                {event.location || event.venue || "Location TBD"}
              </p>

              <div className="event-details-visible">
                <div className="event-detail-row">
                  <span className="detail-label">Event ID:</span>
                  <span className="detail-value">
                    {event.id || event.eventId || "N/A"}
                  </span>
                </div>
                <div className="event-detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">
                    {event.status || "Active"}
                  </span>
                </div>
                <div className="event-detail-row">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">
                    {event.category || "General"}
                  </span>
                </div>
              </div>

              <div className="event-progress">
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${event.progress || 0}%`,
                      backgroundColor: getProgressColor(event.progress || 0),
                    }}
                  ></div>
                </div>
                <span className="progress-percentage">
                  {event.progress || 0}%
                </span>
              </div>

              <div className="event-footer">
                <span className="event-price">
                  ${event.price || event.ticketPrice || 0}
                </span>
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
