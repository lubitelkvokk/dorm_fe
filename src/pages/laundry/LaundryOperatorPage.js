import React, { useState, useEffect } from "react";
import { apiService } from "../../services/ApiService";

const LaundryOperatorPage = () => {
  const [washingTypes, setWashingTypes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newWashingType, setNewWashingType] = useState({
    type: "",
    price: "",
  });

  // Получение типов стирки
  const fetchWashingTypes = async () => {
    setLoading(true);
    try {
      const data = await apiService.get("laundry/washing_type");
      setWashingTypes(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Получение заказов
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await apiService.get("laundry/order"); // Предполагается, что существует такой эндпоинт
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Добавление нового типа стирки
  const handleAddWashingType = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("laundry/washing_type", newWashingType);
      alert("Washing type added successfully!");
      setNewWashingType({ type: "", price: "" });
      fetchWashingTypes(); // Обновляем список типов стирки
    } catch (err) {
      alert(`Failed to add washing type: ${err.message}`);
    }
  };

  // Подтверждение заказа
  const handleCommitOrder = async (orderId) => {
    try {
      await apiService.put(`laundry/order/${orderId}`);
      alert("Order committed successfully!");
      fetchOrders(); // Обновляем список заказов
    } catch (err) {
      alert(`Failed to commit order: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchWashingTypes();
    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Laundry Operator Page</h1>

      <section>
        <h2>Add New Washing Type</h2>
        <form onSubmit={handleAddWashingType}>
          <div>
            <label htmlFor="type">Type:</label>
            <input
              id="type"
              name="type"
              value={newWashingType.type}
              onChange={(e) =>
                setNewWashingType((prev) => ({ ...prev, type: e.target.value }))
              }
              required
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              id="price"
              name="price"
              type="number"
              value={newWashingType.price}
              onChange={(e) =>
                setNewWashingType((prev) => ({ ...prev, price: e.target.value }))
              }
              required
            />
          </div>
          <button type="submit">Add Washing Type</button>
        </form>
      </section>

      <section>
        <h2>Pending Orders</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>ISU</th>
              <th>Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.isu}</td>
                <td>{order.date}</td>
                <td>{order.time}</td>
                <td>
                  <button onClick={() => handleCommitOrder(order.id)}>
                    Commit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export { LaundryOperatorPage };
