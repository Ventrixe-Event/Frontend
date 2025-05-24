import React, { useState } from "react";

const Invoices = () => {
  // Sample invoice data
  const [invoices] = useState([
    {
      id: "INV1981",
      amount: 654,
      date: "2025-04-28T00:00:00",
      status: "Overdue",
      bookingId: "6767",
      userId: "777",
      eventId: "98Test",
      issuedDate: "2025-05-20T00:00:00",
      dueDate: "2025-06-15",
    },
    {
      id: "INV1987",
      amount: 5656,
      date: "2025-08-17T00:00:00",
      status: "Overdue",
      bookingId: "6768",
      userId: "778",
      eventId: "99Test",
      issuedDate: "2025-08-17T00:00:00",
      dueDate: "2025-09-15",
    },
    {
      id: "INV888",
      amount: 5500,
      date: "2025-03-02T00:00:00",
      status: "Overdue",
      bookingId: "6769",
      userId: "779",
      eventId: "100Test",
      issuedDate: "2025-03-02T00:00:00",
      dueDate: "2025-04-01",
    },
  ]);

  const [selectedInvoice, setSelectedInvoice] = useState(invoices[0]);
  const [editableInvoice, setEditableInvoice] = useState({ ...invoices[0] });

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

  const handleSave = () => {
    // Save logic would go here
    console.log("Saving invoice:", editableInvoice);
    setSelectedInvoice({ ...editableInvoice });
  };

  const handleCancel = () => {
    setEditableInvoice({ ...selectedInvoice });
  };

  const handleDelete = () => {
    // Delete logic would go here
    console.log("Deleting invoice:", selectedInvoice.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const formatCurrency = (amount) => {
    return `$${amount}`;
  };

  return (
    <div className="invoices-page">
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
                  <h4 className="invoice-id">{invoice.id}</h4>
                  <span className="invoice-amount">
                    {formatCurrency(invoice.amount)}
                  </span>
                </div>
                <div className="invoice-item-details">
                  <span className="invoice-date">
                    {formatDate(invoice.date)}
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
                <h2>#{editableInvoice.id}</h2>
                <span className="status-badge status-unpaid">Unpaid</span>
              </div>

              <div className="invoice-details-form">
                <div className="form-group">
                  <label>Booking Id:</label>
                  <span>{editableInvoice.bookingId}</span>
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
                  <span>{formatDate(editableInvoice.issuedDate)}</span>
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
