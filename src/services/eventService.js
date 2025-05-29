import { eventsApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

export const eventService = {
  // Get all events
  async getAllEvents() {
    try {
      const response = await eventsApi.get(ENDPOINTS.EVENTS.ALL);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch events",
      };
    }
  },

  // Get event by ID
  async getEventById(id) {
    try {
      const response = await eventsApi.get(ENDPOINTS.EVENTS.BY_ID(id));
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch event",
      };
    }
  },

  // Create new event
  async createEvent(eventData) {
    try {
      const response = await eventsApi.post(ENDPOINTS.EVENTS.CREATE, eventData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error creating event:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to create event",
      };
    }
  },

  // Update event
  async updateEvent(id, eventData) {
    try {
      const response = await eventsApi.put(
        ENDPOINTS.EVENTS.UPDATE(id),
        eventData
      );
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error updating event:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update event",
      };
    }
  },

  // Delete event
  async deleteEvent(id) {
    try {
      const response = await eventsApi.delete(ENDPOINTS.EVENTS.DELETE(id));
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error("Error deleting event:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to delete event",
      };
    }
  },
};

export default eventService;
