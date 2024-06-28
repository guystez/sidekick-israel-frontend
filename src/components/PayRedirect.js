// src/components/PayRedirect.js
import React, { useState } from 'react';
import axios from 'axios';

const PayRedirect = () => {
  const [orderReference, setOrderReference] = useState('');
  const [customerFullName, setCustomerFullName] = useState('');
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    const orderData = {
      order_reference: orderReference,
      IPNAddress: "https://someurl.com/listener",
      DisplayType: "redirect",
      CancelReturnAddress: "https://someurl.com/cancelorder?ordeid=1da23a",
      RedirectAddress: "https://someurl.com/processSuccess?ordeid=1da23a",
      CustomerFullName: customerFullName,
      CustomerPhoneNumber: customerPhoneNumber,
      DealType: 1, // Assuming a regular deal type
      OrderTotalSum: 100, // Example order total sum
      Currency: "ILS",
      // Add more fields as needed from the documentation
    };

    try {
      const response = await axios.post(
        'https://api.takbull.co.il/api/ExtranalAPI/GetTakbullPaymentPageRedirectUrl',
        orderData,
        {
          headers: {
            'Content-Type': 'application/json',
            'API_Secret': '488447db-0503-4fc8-9ed0-4e1d62ee0114',
            'API_Key': '95ed9b8d-8702-4c54-9dd8-b9242c7e3427'
          }
        }
      );

      if (response.data && response.data.uniqId) {
        setRedirectUrl(`https://api.takbull.co.il/PaymentGateway?orderUniqId=${response.data.uniqId}`);
      } else {
        throw new Error('Failed to get a valid response');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Payment Redirect</h1>
      <input
        type="text"
        placeholder="Order Reference"
        value={orderReference}
        onChange={(e) => setOrderReference(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customer Full Name"
        value={customerFullName}
        onChange={(e) => setCustomerFullName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customer Phone Number"
        value={customerPhoneNumber}
        onChange={(e) => setCustomerPhoneNumber(e.target.value)}
      />
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {redirectUrl && (
        <div>
          <p>Redirect URL:</p>
          <a href={redirectUrl} target="_blank" rel="noopener noreferrer">
            {redirectUrl}
          </a>
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PayRedirect;
