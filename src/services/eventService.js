import { eventsApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

export const eventService = {
  // Get all events
  async getAllEvents() {
    try {
      const response = await eventsApi.get(ENDPOINTS.EVENTS.ALL);
      return {
        success: true,
        data: response.data.success ? response.data.data : response.data,
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
        data: response.data.success ? response.data.data : response.data,
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

  // Get events by category
  async getEventsByCategory(category) {
    try {
      const response = await eventsApi.get(
        ENDPOINTS.EVENTS.BY_CATEGORY(category)
      );
      return {
        success: true,
        data: response.data.success ? response.data.data : response.data,
      };
    } catch (error) {
      console.error("Error fetching events by category:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch events by category",
      };
    }
  },

  // Get events by status
  async getEventsByStatus(status) {
    try {
      const response = await eventsApi.get(ENDPOINTS.EVENTS.BY_STATUS(status));
      return {
        success: true,
        data: response.data.success ? response.data.data : response.data,
      };
    } catch (error) {
      console.error("Error fetching events by status:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch events by status",
      };
    }
  },

  // Search events
  async searchEvents(searchTerm) {
    try {
      const response = await eventsApi.get(ENDPOINTS.EVENTS.SEARCH(searchTerm));
      return {
        success: true,
        data: response.data.success ? response.data.data : response.data,
      };
    } catch (error) {
      console.error("Error searching events:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to search events",
      };
    }
  },

  // Create new event
  async createEvent(eventData) {
    try {
      const response = await eventsApi.post(ENDPOINTS.EVENTS.CREATE, eventData);
      return {
        success: true,
        data: response.data.success ? response.data.data : response.data,
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
        data: response.data.success ? response.data.data : response.data,
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
        data: response.data.success ? response.data.data : response.data,
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

  // Helper method to get formatted events for display
  async getEventsForDisplay() {
    const result = await this.getAllEvents();
    if (!result.success) return result;

    // Transform the data for display if needed
    const transformedEvents = result.data.map((event) => ({
      ...event,
      // Add any additional formatting or computed properties
      dateAndTime:
        event.formattedDateAndTime ||
        `${event.formattedDate} - ${event.formattedTime}`,
      statusColor: event.status === "Active" ? "green" : "gray",
      progressPercent: `${event.progress}%`,
    }));

    return {
      success: true,
      data: transformedEvents,
    };
  },
};

export default eventService;
