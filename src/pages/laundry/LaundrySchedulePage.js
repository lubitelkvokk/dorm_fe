import React, { useState, useEffect } from "react";
import { apiService } from "../../services/ApiService";

const LaundrySchedulePage = () => {
  const [schedule, setSchedule] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [washingTypes, setWashingTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    washingTypeId: "",
    bagsCount: 1,
    date: "",
    time: "",
  });
  const [selectedDay, setSelectedDay] = useState(0); // Выбранный день относительно текущего

  // Генерация дат для отображения в выпадающем списке
  const getDaysOptions = () => {
    const options = [];
    const today = new Date();
    for (let i = 0; i <= 6; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      const dayLabel = futureDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
      options.push({ value: i, label: dayLabel });
    }
    return options;
  };

  // Получение расписания
  const fetchSchedule = async (day) => {
    setLoading(true);
    try {
      const data = await apiService.get(`laundry/schedule?day=${day}`);
      setSchedule(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule(selectedDay);
  }, [selectedDay]);

  // Получение типов стирки
  useEffect(() => {
    const fetchWashingTypes = async () => {
      try {
        const data = await apiService.get("laundry/washing_type");
        setWashingTypes(data);
      } catch (err) {
        console.error("Failed to fetch washing types:", err);
      }
    };

    fetchWashingTypes();
  }, []);

  const handleSlotSelect = (slot) => {
    if (!slot.isBusy) {
      setSelectedSlot(slot);
      setFormData({
        ...formData,
        date: slot.date,
        time: slot.time,
      });
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiService.post("laundry/order", formData);
      alert("Laundry order created successfully!");
      setSelectedSlot(null); // Сбрасываем выбранный слот
      setFormData({
        washingTypeId: "",
        bagsCount: 1,
        date: "",
        time: "",
      }); // Очищаем форму
      fetchSchedule(selectedDay); // Обновляем расписание
    } catch (err) {
      alert(`Failed to create order: ${err}`);
    }
  };

  const handleDayChange = (e) => {
    setSelectedDay(parseInt(e.target.value, 10)); // Обновляем выбранный день
  };

  if (loading) return <p>Loading schedule...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Laundry Schedule</h1>
      <div>
        <label htmlFor="daySelect">Select Day:</label>
        <select id="daySelect" value={selectedDay} onChange={handleDayChange}>
          {getDaysOptions().map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((slot) => (
            <tr
              key={slot.id}
              style={{ backgroundColor: slot.isBusy ? "red" : "white", cursor: "pointer" }}
              onClick={() => handleSlotSelect(slot)}
            >
              <td>{slot.date}</td>
              <td>{slot.time}</td>
              <td>{slot.isBusy ? "Busy" : "Available"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedSlot && (
        <div>
          <h2>Order Details</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <label htmlFor="washingTypeId">Washing Type:</label>
              <select
                id="washingTypeId"
                name="washingTypeId"
                value={formData.washingTypeId}
                onChange={handleFormChange}
                required
              >
                <option value="">Select a washing type</option>
                {washingTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.type} - {type.price}р.
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bagsCount">Bags Count:</label>
              <input
                type="number"
                id="bagsCount"
                name="bagsCount"
                min="1"
                value={formData.bagsCount}
                onChange={handleFormChange}
                required
              />
            </div>
            <div>
              <label>Date:</label>
              <span>{formData.date}</span>
            </div>
            <div>
              <label>Time:</label>
              <span>{formData.time}</span>
            </div>
            <button type="submit">Confirm Order</button>
          </form>
        </div>
      )}
    </div>
  );
};

export { LaundrySchedulePage };
