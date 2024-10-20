import React, { useEffect, useState } from 'react';
import { allHistoryCartItemOfMember, createOrder, getOrderStatus } from "../utils/ApiFunctions.js";
import { useLocation } from 'react-router-dom';

const AllCartItemOfme = () => {
  const [cartItems, setCartItems] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState(null); // State to store payment information
  const location = useLocation();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await allHistoryCartItemOfMember();
        if (response.status) {
          setCartItems(response.data);
        } else {
          console.error('Error fetching cart items:', response.message);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      if (location.search) {
        const params = new URLSearchParams(location.search);
        const orderId = params.get('orderId');
        const errorCode = params.get('errorCode');

        if (orderId && errorCode === '0') {
          try {
            const response = await getOrderStatus(orderId);
            if (response.status) {
              setPaymentInfo(response.data);
            } else {
              console.error('Error fetching order status:', response.message);
            }
          } catch (error) {
            console.error('Error fetching order status:', error);
          }
        }
      }
    };

    fetchPaymentInfo();
  }, [location.search]);

  const handleOrder = async () => {
    const cartIds = cartItems.map(item => item.cartItemId);
    const orderData = {
      paymentMethod: 'MOMO',
      cartIds: cartIds,
      deliveryAddress: 'dia chi la khi order',
    };

    try {
      const orderResponse = await createOrder(orderData);
      console.log('Order created successfully:', orderResponse);
      setPaymentInfo(orderResponse.data); 

      if (orderResponse.data && orderResponse.data.payUrl) {
        window.open(orderResponse.data.payUrl, '_blank');
      }
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>My Cart Items</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {cartItems.map(item => (
          <li
            key={item.cartItemId}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              margin: '10px 0',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 10px' }}>{item.productName}</h2>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Product ID: {item.productId}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Cart Item ID: {item.cartItemId}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Quantity: {item.quantity}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Unit Price: {item.unitPrice}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Total Price: {item.totalPrice}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Status: {item.status}</p>
            {item.image && (
              <img src={`data:image/png;base64,${item.image}`} alt={item.productName} style={{ width: '100px', height: '100px' }} />
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleOrder} style={{ display: 'block', margin: '20px auto', padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Order
      </button>
      {paymentInfo && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Payment Information</h2>
          <p><strong>Order ID:</strong> {paymentInfo.orderId}</p>
          <p><strong>Amount:</strong> {paymentInfo.amount}</p>
          <p><strong>Message:</strong> {paymentInfo.message}</p>
          <p><strong>Local Message:</strong> {paymentInfo.localMessage}</p>
          <p><strong>Response Time:</strong> {paymentInfo.responseTime}</p>
          <p><strong>Error Code:</strong> {paymentInfo.errorCode}</p>
          {paymentInfo.errorCode === '0' && (
            <p style={{ color: 'green' }}>Payment Successful</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCartItemOfme;