import { invoicesApi } from "./api";
import { ENDPOINTS } from "../config/apiConfig";

export const invoiceService = {
  // Get all invoices
  getAllInvoices: async (params = {}) => {
    try {
      const response = await invoicesApi.get(ENDPOINTS.INVOICES.ALL, {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices:", error);
      throw error;
    }
  },

  // Get invoice by ID
  getInvoiceById: async (id) => {
    try {
      const response = await invoicesApi.get(ENDPOINTS.INVOICES.BY_ID(id));
      return response.data;
    } catch (error) {
      console.error("Error fetching invoice by ID:", error);
      throw error;
    }
  },

  // Get invoice by number
  getInvoiceByNumber: async (invoiceNumber) => {
    try {
      const response = await invoicesApi.get(
        ENDPOINTS.INVOICES.BY_NUMBER(invoiceNumber)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching invoice by number:", error);
      throw error;
    }
  },

  // Get invoices by status
  getInvoicesByStatus: async (status) => {
    try {
      const response = await invoicesApi.get(
        ENDPOINTS.INVOICES.BY_STATUS(status)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices by status:", error);
      throw error;
    }
  },

  // Get invoices by event ID
  getInvoicesByEvent: async (eventId) => {
    try {
      const response = await invoicesApi.get(
        ENDPOINTS.INVOICES.BY_EVENT(eventId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices by event:", error);
      throw error;
    }
  },

  // Get invoices by user ID
  getInvoicesByUser: async (userId) => {
    try {
      const response = await invoicesApi.get(
        ENDPOINTS.INVOICES.BY_USER(userId)
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching invoices by user:", error);
      throw error;
    }
  },

  // Get overdue invoices
  getOverdueInvoices: async () => {
    try {
      const response = await invoicesApi.get(ENDPOINTS.INVOICES.OVERDUE);
      return response.data;
    } catch (error) {
      console.error("Error fetching overdue invoices:", error);
      throw error;
    }
  },

  // Create new invoice
  createInvoice: async (invoiceData) => {
    try {
      const response = await invoicesApi.post(
        ENDPOINTS.INVOICES.CREATE,
        invoiceData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating invoice:", error);
      throw error;
    }
  },

  // Update invoice
  updateInvoice: async (id, updateData) => {
    try {
      const response = await invoicesApi.put(
        ENDPOINTS.INVOICES.UPDATE(id),
        updateData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating invoice:", error);
      throw error;
    }
  },

  // Delete invoice
  deleteInvoice: async (id) => {
    try {
      const response = await invoicesApi.delete(ENDPOINTS.INVOICES.DELETE(id));
      return response.data;
    } catch (error) {
      console.error("Error deleting invoice:", error);
      throw error;
    }
  },
};
