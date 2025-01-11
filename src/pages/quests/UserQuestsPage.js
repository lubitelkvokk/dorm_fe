import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/ApiService';

const UserQuestsPage = () => {
    const [userQuests, setUserQuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserQuests = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await apiService.get('quest/my_quests');
                setUserQuests(data.content || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserQuests();
    }, []);

    const completeQuest = async (questId, isuNumber, rating) => {
        try {
            let response = await apiService.put('quest', { questId, isuNumber, rating });
            setUserQuests((prev) => prev.filter((quest) => quest.id !== questId));
            alert('Quest completed successfully!');
        } catch (err) {
            alert(`Failed to complete quest: ${err.message}`);
        }
    };

    if (loading) return <p>Loading your quests...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>My Quests</h1>
            <ul>
                {userQuests.map((quest) => (
                    <li key={quest.id}>
                        <h3>{quest.description}</h3>
                        <p>Reward: {quest.reward}</p>
                        <p>Type: {quest.questType}</p>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const isuNumber = formData.get('isuNumber');
                                const rating = formData.get('rating');
                                completeQuest(quest.id, isuNumber, rating);
                            }}
                        >
                            <div>
                                <label htmlFor={`isuNumber-${quest.id}`}>ISU Number:</label>
                                <input type="text" id={`isuNumber-${quest.id}`} name="isuNumber" required />
                            </div>
                            <div>
                                <label htmlFor={`rating-${quest.id}`}>Rating:</label>
                                <input type="number" id={`rating-${quest.id}`} name="rating" min="1" max="5" required />
                            </div>
                            <button type="submit">Complete</button>
                        </form>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export { UserQuestsPage };
