import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaChevronDown,
  FaTh,
  FaList,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUsers,
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
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState(""); // Track data source

  // Categories for the dropdown
  const categories = [
    "All Category",
    "Music",
    "Technology",
    "Fashion",
    "Food & Culinary",
    "Health & Wellness",
    "Art & Design",
    "Outdoor & Adventure",
  ];

  // Status counts for tabs
  const [statusCounts, setStatusCounts] = useState({
    Active: 0,
    Draft: 0,
    Past: 0,
  });

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("🔄 Attempting to fetch data from EventService API...");
        const result = await eventService.getAllEvents();

        if (result.success && result.data) {
          console.log(
            "✅ API data received:",
            result.data.length,
            "event entries"
          );
          setEvents(result.data);
          updateStatusCounts(result.data);
          setDataSource("API");
        } else {
          console.log("⚠️ API call succeeded but no valid data");
          setError(result.error || "Failed to fetch events");
          setDataSource("Error");
        }
      } catch (err) {
        console.log("❌ API not available:", err.message);
        setError("An unexpected error occurred");
        setDataSource("Error");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Update status counts for tabs
  const updateStatusCounts = (eventsData) => {
    const counts = eventsData.reduce(
      (acc, event) => {
        if (event.status === "Active") acc.Active++;
        else if (event.status === "Draft") acc.Draft++;
        else acc.Past++;
        return acc;
      },
      { Active: 0, Draft: 0, Past: 0 }
    );
    setStatusCounts(counts);
  };

  // Filter events based on current filters
  useEffect(() => {
    let filtered = [...events];

    // Filter by status (tab)
    if (activeTab === "Active") {
      filtered = filtered.filter((event) => event.status === "Active");
    } else if (activeTab === "Draft") {
      filtered = filtered.filter((event) => event.status === "Draft");
    } else if (activeTab === "Past") {
      filtered = filtered.filter((event) => event.status === "Past");
    }

    // Filter by category
    if (selectedCategory !== "All Category") {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, activeTab, selectedCategory, searchTerm]);

  // Handle search
  const handleSearch = async () => {
    if (searchTerm.trim()) {
      try {
        setLoading(true);
        const result = await eventService.searchEvents(searchTerm);
        if (result.success) {
          setFilteredEvents(result.data);
        }
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle category filter
  const handleCategoryFilter = async (category) => {
    setSelectedCategory(category);

    if (category !== "All Category") {
      try {
        setLoading(true);
        const result = await eventService.getEventsByCategory(category);
        if (result.success) {
          // Still need to apply other filters
          let filtered = result.data;
          if (activeTab !== "Active") {
            filtered = filtered.filter((event) => event.status === activeTab);
          }
          setFilteredEvents(filtered);
        }
      } catch (err) {
        console.error("Category filter error:", err);
      } finally {
        setLoading(false);
      }
    }
  };

  // Get status color for event cards
  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#10B981"; // green
      case "Draft":
        return "#F59E0B"; // yellow
      case "Past":
        return "#6B7280"; // gray
      default:
        return "#6B7280";
    }
  };

  // Format progress bar color based on percentage
  const getProgressColor = (progress) => {
    if (progress >= 80) return "#10B981"; // green
    if (progress >= 60) return "#3B82F6"; // blue
    if (progress >= 40) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3>Error Loading Events</h3>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="events-page">
      <div className="events-header">
        <h1>Events</h1>
      </div>

      {/* Data Source Indicator */}
      {dataSource && (
        <div
          style={{
            padding: "10px 20px",
            marginBottom: "20px",
            borderRadius: "8px",
            backgroundColor: dataSource === "API" ? "#e8f5e8" : "#fff3cd",
            border:
              dataSource === "API" ? "1px solid #4caf50" : "1px solid #ffc107",
            color: dataSource === "API" ? "#2e7d32" : "#856404",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {dataSource === "API"
            ? "🟢 Data Source: EventService API (Live Data)"
            : "🟡 Data Source: API Error - Please check EventService connection"}
        </div>
      )}

      <div className="events-content">
        {/* Status Tabs */}
        <div className="status-tabs">
          {["Active", "Draft", "Past"].map((status) => (
            <button
              key={status}
              className={`status-tab ${activeTab === status ? "active" : ""}`}
              onClick={() => setActiveTab(status)}
            >
              {status} ({statusCounts[status]})
            </button>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search event, location, etc"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          <div className="filters">
            <div className="filter-dropdown">
              <select
                value={selectedCategory}
                onChange={(e) => handleCategoryFilter(e.target.value)}
                className="category-filter"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <FaChevronDown className="dropdown-icon" />
            </div>

            <div className="filter-dropdown">
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="month-filter"
              >
                <option value="This Month">This Month</option>
                <option value="Next Month">Next Month</option>
                <option value="This Year">This Year</option>
              </select>
              <FaChevronDown className="dropdown-icon" />
            </div>

            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <FaTh />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <FaList />
              </button>
            </div>
          </div>
        </div>

        {/* Events Grid */}
        <div className={`events-grid ${viewMode}`}>
          {filteredEvents.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-card-header">
                <span className="event-category">{event.category}</span>
                <span
                  className="event-status-badge"
                  style={{ backgroundColor: getStatusColor(event.status) }}
                >
                  <span className="status-dot"></span>
                  {event.status}
                </span>
              </div>

              <div className="event-card-image">
                {/* Placeholder for event image */}
                <div className="image-placeholder">
                  <FaCalendarAlt className="placeholder-icon" />
                </div>
              </div>

              <div className="event-card-content">
                <div className="event-meta">
                  <span className="event-date-time">
                    <FaCalendarAlt className="meta-icon" />
                    {event.formattedDateAndTime ||
                      `${event.formattedDate} - ${event.formattedTime}`}
                  </span>
                </div>

                <h3 className="event-title">{event.title}</h3>

                <div className="event-location">
                  <FaMapMarkerAlt className="meta-icon" />
                  <span>{event.location}</span>
                </div>

                {event.description && (
                  <p className="event-description">
                    {event.description.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                )}

                <div className="event-stats">
                  <div className="attendance">
                    <FaUsers className="meta-icon" />
                    <span>
                      {event.currentAttendees}/{event.maxAttendees}
                    </span>
                  </div>
                  {event.organizerName && (
                    <div className="organizer">
                      <span>by {event.organizerName}</span>
                    </div>
                  )}
                </div>

                <div className="progress-section">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${event.progress}%`,
                        backgroundColor: getProgressColor(event.progress),
                      }}
                    ></div>
                  </div>
                  <span className="progress-text">{event.progress}%</span>
                </div>

                <div className="event-footer">
                  <div className="event-price">
                    <FaDollarSign className="price-icon" />
                    <span className="price">${event.price}</span>
                  </div>
                  <div className="event-actions">
                    <button className="action-btn view-btn">View</button>
                    <button className="action-btn edit-btn">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {filteredEvents.length > 0 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {filteredEvents.length} out of {events.length}
            </span>
            <div className="pagination-controls">
              <button className="pagination-btn">
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="pagination-btn active">1</button>
              <button className="pagination-btn">2</button>
              <button className="pagination-btn">3</button>
              <span className="pagination-dots">...</span>
              <button className="pagination-btn">8</button>
              <button className="pagination-btn">
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        )}

        {/* No Events Message */}
        {filteredEvents.length === 0 && !loading && (
          <div className="no-events">
            <FaCalendarAlt className="no-events-icon" />
            <h3>No events found</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;
