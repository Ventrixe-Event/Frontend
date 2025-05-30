import { galleryApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

export const galleryService = {
  // Get all gallery items
  getAllGalleryItems: async (params = {}) => {
    try {
      const response = await galleryApi.get(ENDPOINTS.GALLERY.ALL, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery items:", error);
      throw error;
    }
  },

  // Get gallery item by ID
  getGalleryItemById: async (id) => {
    try {
      const response = await galleryApi.get(ENDPOINTS.GALLERY.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery item by ID:", error);
      throw error;
    }
  },

  // Get gallery items by category
  getGalleryItemsByCategory: async (category) => {
    try {
      const response = await galleryApi.get(
        ENDPOINTS.GALLERY.BY_CATEGORY(category)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery items by category:", error);
      throw error;
    }
  },

  // Get featured gallery items
  getFeaturedGalleryItems: async () => {
    try {
      const response = await galleryApi.get(ENDPOINTS.GALLERY.FEATURED);
      return response.data;
    } catch (error) {
      console.error("Error fetching featured gallery items:", error);
      throw error;
    }
  },

  // Search gallery items
  searchGalleryItems: async (searchTerm) => {
    try {
      const response = await galleryApi.get(
        ENDPOINTS.GALLERY.SEARCH(searchTerm)
      );
      return response.data;
    } catch (error) {
      console.error("Error searching gallery items:", error);
      throw error;
    }
  },

  // Get gallery categories
  getGalleryCategories: async () => {
    try {
      const response = await galleryApi.get(ENDPOINTS.GALLERY.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error("Error fetching gallery categories:", error);
      throw error;
    }
  },

  // Create new gallery item
  createGalleryItem: async (galleryData) => {
    try {
      const response = await galleryApi.post(
        ENDPOINTS.GALLERY.CREATE,
        galleryData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating gallery item:", error);
      throw error;
    }
  },

  // Update gallery item
  updateGalleryItem: async (id, updateData) => {
    try {
      const response = await galleryApi.put(
        ENDPOINTS.GALLERY.UPDATE(id),
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating gallery item:", error);
      throw error;
    }
  },

  // Delete gallery item
  deleteGalleryItem: async (id) => {
    try {
      const response = await galleryApi.delete(ENDPOINTS.GALLERY.DELETE(id));
      return response.data;
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      throw error;
    }
  },

  // Helper method to get formatted gallery items for display
  async getGalleryItemsForDisplay() {
    const result = await this.getAllGalleryItems();
    if (!result.success) return result;

    // Transform the data for display if needed
    const transformedItems = result.data.map((item) => ({
      ...item,
      // Add any additional formatting or computed properties
      priceDisplay: `${item.currency} ${item.price.toFixed(2)}`,
      attendeeDisplay: `${item.attendeeCount.toLocaleString()} attendees`,
      ratingDisplay: `${item.rating.toFixed(1)} (${item.reviewCount} reviews)`,
    }));

    return {
      success: true,
      data: transformedItems,
    };
  },
};

export default galleryService;
