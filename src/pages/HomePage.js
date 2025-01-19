import React from 'react';
import { Link } from 'react-router-dom';
import { checkRole } from '../services/AuthService';

function HomePage() {
  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link to="/quests">View All Quests</Link>
          </li>
          <li>
            <Link to="/laundry/operator">Laundry(operator page)</Link>
          </li>
          {
            checkRole.laundryOperatorRole() &&
            <li>
              <Link to="/laundry/schedule">Laundry-schedule</Link>
            </li>
          }
          {
            checkRole.commandantRole() &&
            <li>
              <Link to="/sing-up">Sign-up user</Link>
            </li>
          }
          <li>
            <Link to="/apps">Applications</Link>
          </li>
          {
            checkRole.engineerOrCommandantRole() &&
            <li>
              <Link to="/apps/admin">Applications admin</Link>
            </li>
          }

        </ul>
      </nav>
    </div>
  );
}

export default HomePage;
