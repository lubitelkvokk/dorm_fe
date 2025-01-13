import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/ApiService';

const QuestsPage = () => {
    const [quests, setQuests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0); // Начинаем с 0
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    const navigate = useNavigate();

    const fetchQuests = async (page, size) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.get(`quest?page=${page}&size=${size}`);
            setQuests(data.content || []);
            setTotalPages(data.totalPages || 1);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuests(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const handleUserQuestsClick = () => navigate('/my-quests');
    const handleCreateQuestClick = () => navigate('/create-quest');

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

export { QuestsPage };
