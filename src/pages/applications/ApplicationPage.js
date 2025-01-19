import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/ApiService';

const ApplicationPage = () => {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchApps = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.get(`application`);
            setApps(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteApp = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.delete(`application/${id}`);
            fetchApps();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApps();
    }, []);

    // const handleUserQuestsClick = () => navigate('/my-quests');
    const handleCreateAppClick = () => navigate('/apps/create');

    if (loading) return <p>Loading apps...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>All Applications</h1>
            {/*<button onClick={handleUserQuestsClick}>View My Quests</button>*/}
            <button onClick={handleCreateAppClick}>Create New Application</button>
            <ul>
                {apps.map((app) => (
                    <li key={app.id}>
                        <h3>{app.description}</h3>
                        <p>Date: {app.date}</p>
                        <p>Time: {app.time}</p>
                        <p>Type: {app.type}</p>
                        <p>Status: {app.completed ? "completed" : "in work"}</p>
                        {app.completed && <div>
                            <p> Completing Date: {app.completionDate}</p>
                            <p> Completing Time: {app.completionTime}</p>
                            <p> Result: {app.result}</p>
                        </div>}
                        <button onClick={() => deleteApp(app.id)}>Delete</button>
                    </li>
                ))}
            </ul>

        </div>
    );
};

export { ApplicationPage };
