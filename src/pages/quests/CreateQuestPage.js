import { apiService } from "../../services/ApiService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const CreateQuestPage = () => {
  const [description, setDescription] = useState('');
  const [reward, setReward] = useState('');
  const [questType, setQuestType] = useState('');
  const [questTypes, setQuestTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const navigate = useNavigate();

  // Load quest types on component mount
  useEffect(() => {
    const fetchQuestTypes = async () => {
      try {
        setTypeError(null);
        const response = await apiService.get('quest/types');
        setQuestTypes(response); // Assuming response is an array
      } catch (err) {
        setTypeError('Failed to load quest types: ' + err.message);
      }
    };
    fetchQuestTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const newQuest = { description, reward, questType };
      await apiService.post('quest', newQuest);
      alert('Quest created successfully!');
      navigate('/my-quests');
    } catch (err) {
      setError('Failed to create quest: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create New Quest</h1>
      <button onClick={() => navigate('/home')}>Back to Home</button>
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
          <select
            value={questType}
            onChange={(e) => setQuestType(e.target.value)}
            required
          >
            <option value="" disabled>Select quest type</option>
            {questTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {typeError && <p>Error: {typeError}</p>}
        </div>
        <button type="submit" disabled={loading || questTypes.length === 0}>
          Create Quest
        </button>
        {loading && <p>Creating quest...</p>}
        {error && <p>Error: {error}</p>}
      </form>
    </div>
  );
};

export { CreateQuestPage };