import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/ApiService';

const QuestsPage = () => {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuests = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiService.get('quest');
                setQuests(data.content || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuests();
    }, []);

    const handleUserQuestsClick = () => {
        navigate('/my-quests');
    };

    const handleCreateQuestClick = () => {
        navigate('/create-quest');
    };

    if (loading) return <p>Loading quests...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>All Quests</h1>
            <button onClick={handleUserQuestsClick}>View My Quests</button>
            <button onClick={handleCreateQuestClick}>Create New Quest</button>
            <ul>
                {quests.map((quest) => (
                    <li key={quest.id}>
                        <h3>{quest.description}</h3>
                        <p>Reward: {quest.reward}</p>
                        <p>Type: {quest.questType}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export { QuestsPage};
