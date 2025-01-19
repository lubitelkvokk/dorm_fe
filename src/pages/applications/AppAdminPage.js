import React, { useState, useEffect } from "react";
import { apiService } from "../../services/ApiService";

const AppAdminPage = () => {
    const [appTypes, setAppTypes] = useState([]);
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newType, setNewType] = useState({
        type: "",
        role: "",
    });
    const [roles, setRoles] = useState(["EMPLOYEE", "ENGINEER", "COMMANDANT"]);
    const [result, setResult] = useState('');

    const fetchAppTypes = async () => {
        setLoading(true);
        try {
            const data = await apiService.get("application/types");
            setAppTypes(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchApps = async () => {
        setLoading(true);
        try {
            const data = await apiService.get("application/role");
            setApps(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Добавление нового типа
    const handleAddType = async (e) => {
        e.preventDefault();
        try {
            await apiService.post("application/type", newType);
            alert("Washing type added successfully!");
            setNewType({ type: "", role: "" });
            fetchAppTypes();
        } catch (err) {
            alert(`Failed to add type: ${err.message}`);
        }
    };

    const handleCompleteApp = async (id) => {
        try {
            await apiService.post(`application/complete/${id}`, result);
            alert("Application committed successfully!");
            fetchApps();
        } catch (err) {
            alert(`Failed to complete app: ${err.message}`);
        }
    };

    useEffect(() => {
        fetchAppTypes();
        fetchApps();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Application Admin Page</h1>

            <section>
                <h2>Add New application Type</h2>
                <form onSubmit={handleAddType}>
                    <div>
                        <label htmlFor="type">Type:</label>
                        <input
                            id="type"
                            name="type"
                            value={newType.type}
                            onChange={(e) =>
                                setNewType((prev) => ({ ...prev, type: e.target.value }))
                            }
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="role">Role:</label>
                        {roles.map((role) => (
                            <div>
                                <input
                                    type="radio"
                                    onChange={(e) =>
                                        setNewType((prev) => ({ ...prev, role: role }))
                                    }
                                    required
                                />
                                <label>{role}</label>
                            </div>
                        ))}
                    </div>
                    <button type="submit">Add Application Type</button>
                </form>
            </section>

            <section>
                <h2>Application for you</h2>
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Person</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Description</th>
                        <th>Type</th>
                    </tr>
                    </thead>
                    <tbody>
                    {apps.map((app) => (
                        <tr key={app.id}>
                            <td>{app.id}</td>
                            <td>{app.personId}</td>
                            <td>{app.date}</td>
                            <td>{app.time}</td>
                            <td>{app.description}</td>
                            <td>{app.type}</td>
                            <td>
                                <form onSubmit={() => handleCompleteApp(app.id)}>
                                    <div>
                                        <label htmlFor="result">Answer:</label>
                                        <input
                                            type="text"
                                            value={result}
                                            onChange={(e) => setResult(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit">Complete</button>
                                </form>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export {AppAdminPage};
