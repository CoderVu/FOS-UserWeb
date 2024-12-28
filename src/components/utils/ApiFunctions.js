import axios from "../utils/axiosConfig";

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post("/api/v1/auth/login", loginData);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const loginGoogle = async () => {
  try {
    const response = await axios.get("/api/v1/auth/login-google");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export const allProducts = async () => {
  try {
    const response = await axios.get("/api/v1/public/products/all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const allHistoryCartItemOfMember = async () => {
  try {
    const response = await axios.get("/api/v1/user/cart/history");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post('/api/v1/user/order/create', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await axios.get(`/api/v1/user/order/status/${orderId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
};
export const getAllHistoryOrderOfMember = async () => {
  try {
    const response = await axios.get("/api/v1/user/order/history/all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
