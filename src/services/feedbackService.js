import { feedbackApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

export const feedbackService = {
  // Get all feedback with optional filters
  getAllFeedback: async (params = {}) => {
    try {
      const response = await feedbackApi.get(ENDPOINTS.FEEDBACK.ALL, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback:", error);
      throw error;
    }
  },

  // Get feedback by ID
  getFeedbackById: async (id) => {
    try {
      const response = await feedbackApi.get(ENDPOINTS.FEEDBACK.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback by ID:", error);
      throw error;
    }
  },

  // Get feedback by event ID
  getFeedbackByEvent: async (eventId) => {
    try {
      const response = await feedbackApi.get(
        ENDPOINTS.FEEDBACK.BY_EVENT(eventId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback by event:", error);
      throw error;
    }
  },

  // Create new feedback
  createFeedback: async (feedbackData) => {
    try {
      const response = await feedbackApi.post(
        ENDPOINTS.FEEDBACK.CREATE,
        feedbackData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating feedback:", error);
      throw error;
    }
  },

  // Get feedback statistics
  getFeedbackStats: async (params = {}) => {
    try {
      const response = await feedbackApi.get(ENDPOINTS.FEEDBACK.STATS, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching feedback stats:", error);
      throw error;
    }
  },

  // Get feedback categories
  getCategories: async () => {
    try {
      const response = await feedbackApi.get(ENDPOINTS.FEEDBACK.CATEGORIES);
      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
