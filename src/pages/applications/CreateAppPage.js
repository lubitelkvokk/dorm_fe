import {apiService} from "../../services/ApiService";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const CreateAppPage = () => {
    const [types, setTypes] = useState([]);
    const [description, setDescription] = useState('');
    const [applicationTypeId, setAppType] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const fetchTypes = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await apiService.get(`application/types`);
            setTypes(data || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const newApp = {description, applicationTypeId};
            await apiService.post('application', newApp);
            alert('Application created successfully!');
            navigate('/apps');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    const handleUserBackClick = () => navigate('/apps');


    return (
        <div>
            <h1>Create New Application</h1>
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
                    <label>Quest Type:</label>
                    {/* <select id="options" value={appType} onChange={(e) => setAppType(e.target.value)}>*/}
                    {types.map((type) => (
                        <div>
                            <input
                                type="radio"
                                // id={type.id}
                                // value={type.id}
                                onChange={(e) => setAppType(type.id)}
                                required
                            />
                            <label>{type.type}</label>
                        </div>
                    ))}
                    {/*</select>*/}


                </div>
                <button type="submit" disabled={loading}>Create Quest</button>
                {loading && <p>Creating app...</p>}
                {error && <p>Error: {error}</p>}
            </form>
            <button onClick={handleUserBackClick}>Back</button>
        </div>
    );
};


export {CreateAppPage};