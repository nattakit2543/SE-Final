import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import handleError from '../utils/errorUtils';

const RequestContext = createContext();

export const useRequests = () => useContext(RequestContext);

export const RequestProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []); 

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:3100/requests');
      console.log("Orders fetched:", response.data);
      setOrders(response.data);
    } catch (error) {
      handleError(error, { message: 'Failed to fetch orders' });
    }
  };

  const addOrder = async (newOrder) => {
    try {
      const response = await axios.post('http://localhost:3100/requests', newOrder);
      setOrders(prevOrders => [...prevOrders, response.data]);
    } catch (error) {
      handleError(error, { message: 'Failed to add order' });
    }
  };

  const deleteOrder = async (courseCode) => {
    try {
      await axios.delete(`http://localhost:3100/requests/${courseCode}`);
      setOrders(currentOrders => currentOrders.filter(order => order.courseCode !== courseCode));
    } catch (error) {
      handleError(error, { message: 'Failed to delete order' });
    }
  };

  return (
    <RequestContext.Provider value={{ orders, fetchOrders, addOrder, deleteOrder }}>
      {children}
    </RequestContext.Provider>
  );
};
