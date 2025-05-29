import React, { useState, useEffect } from "react";
import {
  FaStar,
  FaUser,
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { feedbackService } from "../../services/feedbackService";
import "./Feedback.css";

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedPeriod, setSelectedPeriod] = useState("This Year");
  const [selectedRatingFilter, setSelectedRatingFilter] =
    useState("All Rating");
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState("All Category");
  const [dataSource, setDataSource] = useState(""); // Track data source

  // Mock data for fallback when API is not available
  const mockStats = {
    overallRating: 4.8,
    totalReviews: 15545,
    monthlyData: [
      { month: "Jan", rating1to3: 650, rating4to5: 880 },
      { month: "Feb", rating1to3: 700, rating4to5: 920 },
      { month: "Mar", rating1to3: 680, rating4to5: 900 },
      { month: "Apr", rating1to3: 620, rating4to5: 870 },
      { month: "May", rating1to3: 690, rating4to5: 910 },
      { month: "Jun", rating1to3: 720, rating4to5: 950 },
      { month: "Jul", rating1to3: 680, rating4to5: 890 },
      { month: "Aug", rating1to3: 630, rating4to5: 860 },
      { month: "Sep", rating1to3: 710, rating4to5: 940 },
      { month: "Oct", rating1to3: 690, rating4to5: 920 },
      { month: "Nov", rating1to3: 720, rating4to5: 960 },
      { month: "Dec", rating1to3: 700, rating4to5: 930 },
    ],
  };

  const mockFeedback = [
    {
      id: "1",
      userName: "Jackson Moore",
      rating: 5,
      content:
        "An absolutely amazing festival! The lineup of artists was incredible, and the sound quality was impeccable. The energy from the crowd made it a night to remember.",
      eventName: "Echo Beats Festival",
      categoryName: "Music",
      createdAt: "2029-04-22T00:00:00Z",
      isAnonymous: false,
    },
    {
      id: "2",
      userName: "Alicia Smithson",
      rating: 4,
      content:
        "Beautiful designs and a well-organized event overall. The models and lighting were captivating, but the seating arrangements could have been planned better for the audience.",
      eventName: "Runway Revolution 2029",
      categoryName: "Fashion",
      createdAt: "2029-05-02T00:00:00Z",
      isAnonymous: false,
    },
    {
      id: "3",
      userName: "Patrick Cooper",
      rating: 5,
      content:
        "The music under the open sky was breathtaking. The orchestra was phenomenal, and the ambiance made it feel like a dream. Everything was organized beautifully.",
      eventName: "Symphony Under the Stars",
      categoryName: "Music",
      createdAt: "2029-04-20T00:00:00Z",
      isAnonymous: false,
    },
    {
      id: "4",
      userName: "Clara Simmons",
      rating: 4,
      content:
        "The variety of cuisines and food stalls was fantastic! The flavors were outstanding, though some popular stalls ran out of food too early in the event.",
      eventName: "Culinary Delights Festival",
      categoryName: "Food & Culinary",
      createdAt: "2029-05-25T00:00:00Z",
      isAnonymous: false,
    },
    {
      id: "5",
      userName: "Natalie Johnson",
      rating: 5,
      content:
        "The expo was a treat for art lovers! The installations were awe-inspiring, and the chance to meet artists was a highlight of the event for me.",
      eventName: "Artistry Unveiled Expo",
      categoryName: "Art & Design",
      createdAt: "2029-05-15T00:00:00Z",
      isAnonymous: false,
    },
    {
      id: "6",
      userName: "Henry Carter",
      rating: 4,
      content:
        "A fantastic platform for tech enthusiasts to explore the latest innovations. More hands-on workshops would have made the event even better, but it was still very informative.",
      eventName: "Tech Future Expo",
      categoryName: "Technology",
      createdAt: "2029-06-01T00:00:00Z",
      isAnonymous: false,
    },
  ];

  useEffect(() => {
    loadFeedbackData();
  }, [
    currentPage,
    selectedPeriod,
    selectedRatingFilter,
    selectedCategoryFilter,
  ]);

  const loadFeedbackData = async () => {
    try {
      setLoading(true);

      // Try to fetch data from API
      try {
        console.log("🔄 Attempting to fetch data from FeedbackService API...");
        const [feedbackResponse, statsResponse] = await Promise.all([
          feedbackService.getAllFeedback(),
          feedbackService.getFeedbackStats(),
        ]);

        if (feedbackResponse.success && feedbackResponse.result) {
          console.log(
            "✅ API data received:",
            feedbackResponse.result.length,
            "feedback entries"
          );
          setFeedbackData(feedbackResponse.result);
          setTotalPages(Math.ceil(feedbackResponse.result.length / 6));
          setDataSource("API");
        } else {
          console.log(
            "⚠️ API call succeeded but no valid data, using frontend mock data"
          );
          // Fallback to mock data
          setFeedbackData(mockFeedback);
          setTotalPages(Math.ceil(568 / 6));
          setDataSource("Mock");
        }

        if (statsResponse.success && statsResponse.result) {
          console.log("✅ API stats received");
          // Transform API response to match frontend expectations
          const transformedStats = {
            overallRating: statsResponse.result.overallRating,
            totalReviews: statsResponse.result.totalReviews,
            monthlyData: statsResponse.result.monthlyData.map((item) => ({
              month: item.month,
              rating1to3: item.rating1To3,
              rating4to5: item.rating4To5,
            })),
          };
          setStats(transformedStats);
        } else {
          console.log(
            "⚠️ API stats call succeeded but no valid data, using mock stats"
          );
          // Fallback to mock stats
          setStats(mockStats);
          setDataSource("Mock");
        }
      } catch (apiError) {
        console.log(
          "❌ API not available, using frontend mock data:",
          apiError.message
        );
        // Use mock data when API is not available
        setFeedbackData(mockFeedback);
        setStats(mockStats);
        setTotalPages(Math.ceil(568 / 6));
        setDataSource("Mock");
      }
    } catch (error) {
      console.error("❌ Error loading feedback data:", error);
      // Fallback to mock data
      setFeedbackData(mockFeedback);
      setStats(mockStats);
      setTotalPages(Math.ceil(568 / 6));
      setDataSource("Mock");
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <FaStar
        key={i}
        className={i < Math.floor(rating) ? "star-filled" : "star-empty"}
      />
    ));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return <div className="feedback-loading">Loading feedback data...</div>;
  }

  return (
    <div className="feedback-page">
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
            ? "🟢 Data Source: FeedbackService API (Live Data)"
            : "🟡 Data Source: Frontend Mock Data (API Not Available)"}
        </div>
      )}

      {/* Main Content */}
      <div className="feedback-content">
        {/* Ratings Section */}
        <div className="feedback-ratings-section">
          <div className="ratings-card">
            <h3>
              Ratings
              <div className="ratings-period-selector">
                <span>{selectedPeriod}</span>
                <FaChevronDown />
              </div>
            </h3>

            <div className="overall-rating">
              <div className="rating-circle">
                <span className="rating-number">{stats?.overallRating}</span>
                <span className="rating-total">/5</span>
                <div className="rating-reviews">
                  {stats?.totalReviews?.toLocaleString()} Reviews
                </div>
              </div>
            </div>
          </div>

          {/* Feedback Statistics */}
          <div className="feedback-stats-card">
            <h3>
              Feedback Statistics
              <div className="stats-period-selector">
                <span>{selectedPeriod}</span>
                <FaChevronDown />
              </div>
            </h3>

            <div className="stats-summary">
              <div className="stats-item">
                <span className="stats-number">110</span>
                <span className="stats-label">Rating 1-3</span>
              </div>
              <div className="stats-item">
                <span className="stats-number">880</span>
                <span className="stats-label">Rating 4-5</span>
              </div>
            </div>

            <div className="monthly-chart">
              {stats?.monthlyData?.map((month, index) => (
                <div key={index} className="chart-bar">
                  <div className="bar-container">
                    <div
                      className="bar bar-rating-4-5"
                      style={{
                        height: `${Math.min(
                          (month.rating4to5 / 1000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                    <div
                      className="bar bar-rating-1-3"
                      style={{
                        height: `${Math.min(
                          (month.rating1to3 / 1000) * 100,
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>
                  <span className="month-label">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="feedback-filters">
          <div className="filter-item">
            <select
              value={selectedRatingFilter}
              onChange={(e) => setSelectedRatingFilter(e.target.value)}
            >
              <option value="All Rating">All Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
          <div className="filter-item">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            >
              <option value="All Category">All Category</option>
              <option value="Music">Music</option>
              <option value="Fashion">Fashion</option>
              <option value="Food & Culinary">Food & Culinary</option>
              <option value="Art & Design">Art & Design</option>
              <option value="Technology">Technology</option>
            </select>
          </div>
          <div className="filter-item">
            <select>
              <option value="All Event">All Event</option>
            </select>
          </div>
          <div className="date-filter">
            <span>1 April 2029 - 30 May 2029</span>
            <FaChevronDown />
          </div>
        </div>

        {/* Feedback Cards */}
        <div className="feedback-cards">
          {feedbackData.map((feedback) => (
            <div key={feedback.id} className="feedback-card">
              <div className="feedback-card-header">
                <div className="feedback-user">
                  <div className="user-avatar">
                    <FaUser />
                  </div>
                  <div className="user-info">
                    <h4>{feedback.userName}</h4>
                    <div className="feedback-rating">
                      {renderStars(feedback.rating)}
                      <span className="rating-number">{feedback.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="feedback-date">
                  {formatDate(feedback.createdAt)}
                </div>
              </div>

              <div className="feedback-content-text">{feedback.content}</div>

              <div className="feedback-event-info">
                <div className="event-badge">
                  <span>{feedback.eventName}</span>
                </div>
                <div className="event-category">
                  <div className="category-dot"></div>
                  <span>{feedback.categoryName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="feedback-pagination">
          <div className="pagination-info">
            <span>Showing 6 out of 568</span>
          </div>
          <div className="pagination-controls">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <FaChevronLeft />
            </button>

            {[...Array(Math.min(5, totalPages))].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`pagination-btn ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            {totalPages > 5 && <span className="pagination-ellipsis">...</span>}

            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </button>

            <button
              className="pagination-btn"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
