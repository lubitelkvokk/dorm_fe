import { apiService } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CreateQuestPage = () => {
    const [description, setDescription] = useState('');
    const [reward, setReward] = useState('');
    const [questType, setQuestType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError(null);
      try {
        const newQuest = { description, reward, questType };
        await apiService.post('quest', newQuest);
        alert('Quest created successfully!');
        navigate('/');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div>
        <h1>Create New Quest</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Reward:</label>
            <input
              type="text"
              value={reward}
              onChange={(e) => setReward(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Quest Type:</label>
            <input
              type="text"
              value={questType}
              onChange={(e) => setQuestType(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={loading}>Create Quest</button>
          {loading && <p>Creating quest...</p>}
          {error && <p>Error: {error}</p>}
        </form>
      </div>
    );
  };
  

  export {CreateQuestPage};