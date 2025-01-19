import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/ApiService';
import { useNavigate } from 'react-router-dom'; 

const UserQuestsPage = () => {
    const [userQuests, setUserQuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    const fetchUserQuests = async (page, size) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.get(`quest/my_quests?page=${page}&size=${size}`);
            setUserQuests(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserQuests(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const completeQuest = async (questId, isuNumber, rating) => {
        try {
            await apiService.put('quest', { questId, isuNumber, rating });
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
            <button onClick={() => navigate('/home')}>Back to Home</button>
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
            <div>
                <button
                    disabled={currentPage === 0}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage + 1} of {totalPages}
                </span>
                <button
                    disabled={currentPage + 1 === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export { UserQuestsPage };
