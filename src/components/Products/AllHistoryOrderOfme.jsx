import React, { useEffect, useState } from 'react';
import { getAllHistoryOrderOfMember } from "../utils/ApiFunctions.js";

const AllHistoryOrderOfme = () => {
  const [orderDetails, setHistoryOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getAllHistoryOrderOfMember();
        if (response.status) {
          setHistoryOrders(response.data);
        } else {
          console.error('Error fetching orders:', response.message);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Order History</h1>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orderDetails.map(order => (
          <li
            key={order.orderId}
            style={{
              border: '1px solid #ddd',
              borderRadius: '4px',
              margin: '10px 0',
              padding: '10px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}
          >
            <h2 style={{ margin: '0 0 10px' }}>Order Code: {order.orderCode}</h2>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Order ID: {order.orderId}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>User ID: {order.userId}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Store ID: {order.storeId}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Order Date: {order.orderDate}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Total Amount: {order.totalAmount}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Status: {order.status}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Payment Method: {order.paymentMethod}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Delivery Address: {order.deliveryAddress}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Created At: {order.createdAt}</p>
            <p style={{ fontSize: '0.9em', color: '#555' }}>Updated At: {order.updatedAt}</p>
            {order.orderDetails && order.orderDetails.length > 0 && (
              <div>
                <h3>Order Details:</h3>
                <ul>
                  {order.orderDetails.map(detail => (
                    <li key={detail.type}>
                      <p>Type: {detail.type}</p>
                      {detail.productDetail && (
                        <div>
                          <p>Product Name: {detail.productDetail.productName}</p>
                          <img src={`data:image/png;base64,${detail.productDetail.productImage}`} alt={detail.productDetail.productImage} style={{ width: '100px', height: '100px' }} />
                          <p>Description: {detail.productDetail.description}</p>
                          <p>Quantity: {detail.productDetail.quantity}</p>
                          <p>Unit Price: {detail.productDetail.unitPrice}</p>
                          <p>Total Price: {detail.productDetail.totalPrice}</p>
                          <p>Store:{detail.productDetail.storeId}</p>
                        </div>
                      )}
                      {detail.comboDetail && (
                        <div>
                          <p>Combo Name: {detail.comboDetail.combo.comboName}</p>
                          <p>Combo Id : {detail.comboDetail.combo.comboId} </p>
                          <img src={`data:image/png;base64,${detail.comboDetail.combo.image}`} alt={detail.comboDetail.combo.image} style={{ width: '100px', height: '100px' }} />
                          <p>Quantity: {detail.comboDetail.quantity}</p>
                          <p>Unit Price: {detail.comboDetail.unitPrice}</p>
                          <p>Total Price: {detail.comboDetail.totalPrice}</p>
                          <p>Store:{detail.comboDetail.storeId}</p>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllHistoryOrderOfme;