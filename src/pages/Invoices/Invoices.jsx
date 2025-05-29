import React, { useState, useEffect } from "react";
import { invoiceService } from "../../services/invoiceService";

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState(""); // Track data source

  // Mock data for fallback when API is not available
  const mockInvoices = [
    {
      id: "11111111-1111-1111-1111-111111111111",
      invoiceNumber: "INV1981",
      amount: 654,
      issueDate: "2025-04-28T00:00:00",
      dueDate: "2025-06-15",
      status: "Overdue",
      eventId: "22222222-2222-2222-2222-222222222222",
      eventName: "Echo Beats Festival",
      userId: "33333333-3333-3333-3333-333333333333",
      userName: "Jackson Moore",
      description: "Event ticket payment",
      createdAt: "2025-04-28T00:00:00",
    },
    {
      id: "44444444-4444-4444-4444-444444444444",
      invoiceNumber: "INV1987",
      amount: 5656,
      issueDate: "2025-08-17T00:00:00",
      dueDate: "2025-09-15",
      status: "Overdue",
      eventId: "55555555-5555-5555-5555-555555555555",
      eventName: "Runway Revolution 2029",
      userId: "66666666-6666-6666-6666-666666666666",
      userName: "Alicia Smithson",
      description: "VIP event package",
      createdAt: "2025-08-17T00:00:00",
    },
    {
      id: "77777777-7777-7777-7777-777777777777",
      invoiceNumber: "INV888",
      amount: 5500,
      issueDate: "2025-03-02T00:00:00",
      dueDate: "2025-04-01",
      status: "Overdue",
      eventId: "88888888-8888-8888-8888-888888888888",
      eventName: "Symphony Under the Stars",
      userId: "99999999-9999-9999-9999-999999999999",
      userName: "Patrick Cooper",
      description: "Premium seating reservation",
      createdAt: "2025-03-02T00:00:00",
    },
  ];

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editableInvoice, setEditableInvoice] = useState(null);

  useEffect(() => {
    loadInvoiceData();
  }, []);

  const loadInvoiceData = async () => {
    try {
      setLoading(true);

      // Try to fetch data from API
      try {
        console.log("🔄 Attempting to fetch data from InvoiceService API...");
        const response = await invoiceService.getAllInvoices();

        if (response.success && response.result) {
          console.log(
            "✅ API data received:",
            response.result.length,
            "invoice entries"
          );

          // Transform API data to match frontend expectations
          const transformedInvoices = response.result.map((invoice) => ({
            id: invoice.id,
            invoiceNumber: invoice.invoiceNumber,
            amount: invoice.amount,
            issueDate: invoice.issueDate,
            dueDate: invoice.dueDate,
            status: invoice.status,
            eventId: invoice.eventId,
            eventName: invoice.eventName,
            userId: invoice.userId,
            userName: invoice.userName,
            description: invoice.description,
            createdAt: invoice.createdAt,
          }));

          setInvoices(transformedInvoices);
          setSelectedInvoice(transformedInvoices[0]);
          setEditableInvoice({ ...transformedInvoices[0] });
          setDataSource("API");
        } else {
          console.log(
            "⚠️ API call succeeded but no valid data, using frontend mock data"
          );
          // Fallback to mock data
          setInvoices(mockInvoices);
          setSelectedInvoice(mockInvoices[0]);
          setEditableInvoice({ ...mockInvoices[0] });
          setDataSource("Mock");
        }
      } catch (apiError) {
        console.log(
          "❌ API not available, using frontend mock data:",
          apiError.message
        );
        // Use mock data when API is not available
        setInvoices(mockInvoices);
        setSelectedInvoice(mockInvoices[0]);
        setEditableInvoice({ ...mockInvoices[0] });
        setDataSource("Mock");
      }
    } catch (error) {
      console.error("❌ Error loading invoice data:", error);
      // Fallback to mock data
      setInvoices(mockInvoices);
      setSelectedInvoice(mockInvoices[0]);
      setEditableInvoice({ ...mockInvoices[0] });
      setDataSource("Mock");
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceSelect = (invoice) => {
    setSelectedInvoice(invoice);
    setEditableInvoice({ ...invoice });
  };

  const handleFieldChange = (field, value) => {
    setEditableInvoice((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (dataSource === "API") {
        console.log("🔄 Attempting to update invoice via API...");
        const updateData = {
          amount: editableInvoice.amount,
          dueDate: editableInvoice.dueDate,
          status: editableInvoice.status,
          description: editableInvoice.description,
        };

        const response = await invoiceService.updateInvoice(
          editableInvoice.id,
          updateData
        );
        if (response.success) {
          console.log("✅ Invoice updated successfully via API");
          setSelectedInvoice({ ...editableInvoice });
          // Refresh the invoice list
          loadInvoiceData();
        } else {
          console.log("⚠️ API update failed, saving locally only");
          setSelectedInvoice({ ...editableInvoice });
        }
      } else {
        console.log("💾 Saving invoice locally (mock mode)");
        setSelectedInvoice({ ...editableInvoice });
      }
    } catch (error) {
      console.error("❌ Error saving invoice:", error);
      // Still save locally even if API fails
      setSelectedInvoice({ ...editableInvoice });
    }
  };

  const handleCancel = () => {
    setEditableInvoice({ ...selectedInvoice });
  };

  const handleDelete = async () => {
    try {
      if (dataSource === "API") {
        console.log("🔄 Attempting to delete invoice via API...");
        const response = await invoiceService.deleteInvoice(selectedInvoice.id);
        if (response.success) {
          console.log("✅ Invoice deleted successfully via API");
          // Refresh the invoice list
          loadInvoiceData();
        } else {
          console.log("⚠️ API delete failed");
        }
      } else {
        console.log("🗑️ Delete operation (mock mode)");
      }
    } catch (error) {
      console.error("❌ Error deleting invoice:", error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `$${amount}`;
  };

  if (loading) {
    return <div className="invoices-loading">Loading invoice data...</div>;
  }

  return (
    <div className="invoices-page">
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
            ? "🟢 Data Source: InvoiceService API (Live Data)"
            : "🟡 Data Source: Frontend Mock Data (API Not Available)"}
        </div>
      )}

      <div className="invoices-container">
        {/* Left side - Invoice List */}
        <div className="invoice-list-section">
          <h3>Invoice List</h3>
          <div className="invoice-list">
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className={`invoice-item ${
                  selectedInvoice?.id === invoice.id
                    ? "invoice-item--selected"
                    : ""
                }`}
                onClick={() => handleInvoiceSelect(invoice)}
              >
                <div className="invoice-item-header">
                  <h4 className="invoice-id">{invoice.invoiceNumber}</h4>
                  <span className="invoice-amount">
                    {formatCurrency(invoice.amount)}
                  </span>
                </div>
                <div className="invoice-item-details">
                  <span className="invoice-date">
                    {formatDate(invoice.issueDate)}
                  </span>
                  <span
                    className={`invoice-status status-${invoice.status.toLowerCase()}`}
                  >
                    {invoice.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Invoice Details */}
        <div className="invoice-details-section">
          <h3>Invoice Details</h3>
          {selectedInvoice && (
            <div className="invoice-details">
              <div className="invoice-details-header">
                <h2>#{editableInvoice.invoiceNumber}</h2>
                <span className="status-badge status-unpaid">Unpaid</span>
              </div>

              <div className="invoice-details-form">
                <div className="form-group">
                  <label>Booking Id:</label>
                  <span>{editableInvoice.eventId}</span>
                </div>

                <div className="form-group">
                  <label>UserId:</label>
                  <span>{editableInvoice.userId}</span>
                </div>

                <div className="form-group">
                  <label>EventId:</label>
                  <span>{editableInvoice.eventId}</span>
                </div>

                <div className="form-group">
                  <label>Issued Date:</label>
                  <span>{formatDate(editableInvoice.issueDate)}</span>
                </div>

                <div className="form-group">
                  <label>Total Amount:</label>
                  <span>{formatCurrency(editableInvoice.amount)} SEK</span>
                </div>

                <div className="form-group">
                  <label>Due Date:</label>
                  <input
                    type="date"
                    value={editableInvoice.dueDate}
                    onChange={(e) =>
                      handleFieldChange("dueDate", e.target.value)
                    }
                    className="date-input"
                  />
                </div>
              </div>

              <div className="invoice-actions">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Invoices;
