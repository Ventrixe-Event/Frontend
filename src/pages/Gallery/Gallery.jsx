import React, { useState, useEffect } from "react";
import { galleryService } from "../../services/galleryService";
import "./Gallery.css";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Category");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataSource, setDataSource] = useState("Loading");
  const itemsPerPage = 12;

  // Mock data fallback
  const mockGalleryItems = [
    {
      id: "1",
      title: "Echo Beats Festival",
      category: "Music",
      categoryColor: "#FF6B6B",
      formattedDate: "May 20, 2029",
      imageUrl:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      location: "Central Park, New York",
      price: 89.99,
      currency: "USD",
      isFeatured: true,
      rating: 4.8,
      reviewCount: 342,
    },
    {
      id: "2",
      title: "Culinary Delights Festival",
      category: "Food & Culinary",
      categoryColor: "#4ECDC4",
      formattedDate: "May 25, 2029",
      imageUrl:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
      location: "Convention Center, Chicago",
      price: 65.0,
      currency: "USD",
      isFeatured: true,
      rating: 4.6,
      reviewCount: 187,
    },
    // Add more mock items as needed
  ];

  useEffect(() => {
    fetchGalleryData();
  }, []);

  useEffect(() => {
    filterItems();
  }, [galleryItems, selectedCategory, searchTerm]);

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("🔄 Attempting to fetch data from GalleryService API...");

      const [itemsResponse, categoriesResponse] = await Promise.all([
        galleryService.getAllGalleryItems(),
        galleryService.getGalleryCategories(),
      ]);

      if (itemsResponse.success && itemsResponse.data) {
        console.log(
          "✅ API data received:",
          itemsResponse.data.length,
          "gallery items"
        );
        setGalleryItems(itemsResponse.data);
        setDataSource("API");
      } else {
        console.log("⚠️ API call succeeded but no valid data, using mock data");
        setGalleryItems(mockGalleryItems);
        setDataSource("Mock");
      }

      if (categoriesResponse.success && categoriesResponse.data) {
        setCategories(["All Category", ...categoriesResponse.data]);
      } else {
        setCategories([
          "All Category",
          "Music",
          "Food & Culinary",
          "Art & Design",
          "Technology",
        ]);
      }
    } catch (apiError) {
      console.log("❌ API not available, using mock data:", apiError.message);
      setGalleryItems(mockGalleryItems);
      setCategories([
        "All Category",
        "Music",
        "Food & Culinary",
        "Art & Design",
        "Technology",
      ]);
      setDataSource("Mock");
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = galleryItems;

    // Filter by category
    if (selectedCategory !== "All Category") {
      filtered = filtered.filter((item) => item.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return (
      <div className="gallery-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading gallery items...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-container">
        <div className="error-state">
          <p>Error loading gallery: {error}</p>
          <button onClick={fetchGalleryData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gallery-container">
      {/* Data Source Banner */}
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
            ? "🟢 Data Source: GalleryService API (Live Data)"
            : "🟡 Data Source: Frontend Mock Data (API Not Available)"}
        </div>
      )}

      {/* Gallery Grid */}
      <div className="gallery-grid">
        {currentItems.map((item) => (
          <div key={item.id} className="gallery-card">
            <div className="card-image">
              <img src={item.imageUrl} alt={item.title} />
              {item.isFeatured && (
                <span className="featured-badge">Featured</span>
              )}
            </div>
            <div className="card-content">
              <h3 className="card-title">{item.title}</h3>
              <div className="card-meta">
                <span
                  className="card-category"
                  style={{ color: item.categoryColor }}
                >
                  {item.category}
                </span>
                <span className="card-date">{item.formattedDate}</span>
              </div>
              <div className="card-actions">
                <button className="card-menu-btn">⋯</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <span className="pagination-info">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredItems.length)} of{" "}
            {filteredItems.length}
          </span>
          <div className="pagination-controls">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-button"
            >
              ‹
            </button>
            {[...Array(Math.min(totalPages, 5))].map((_, index) => {
              const page = index + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`pagination-button ${
                    currentPage === page ? "active" : ""
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-button"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
