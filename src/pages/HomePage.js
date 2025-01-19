import React from 'react';
import {Link} from 'react-router-dom'; // Импорт компонента Link

function HomePage() {
    return (
        <div>
            <h1>Home Page</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/quests">View Quests</Link>
                    </li>
                    <li>
                        <Link to="/apps">Applications</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default HomePage;
