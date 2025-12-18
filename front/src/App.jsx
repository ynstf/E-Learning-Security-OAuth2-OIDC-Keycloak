import React, { useEffect, useState } from 'react';
import CoursesList from './CoursesList';
import './styles.css';

function App({ keycloak }) {
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        keycloak.loadUserInfo().then(setUserProfile);
    }, [keycloak]);

    const handleLogout = () => keycloak.logout({ redirectUri: window.location.origin });

    return (
        <div className="main-wrapper">
            <header className="top-header">
                <div className="header-content">
                    {userProfile && (
                        <div className="user-info-section">
                            <span className="wave-icon">👋</span>
                            <div className="user-details">
                                <span className="user-name">
                                    Welcome {userProfile.given_name} {userProfile.family_name}
                                </span>
                                <span className="user-email-text">({userProfile.email})</span>
                            </div>
                        </div>
                    )}

                    <button className="sign-out-btn" onClick={handleLogout}>
                        <span className="door-icon">🚪</span>
                        <span>Logout</span>
                    </button>
                </div>
            </header>

            <main className="content-section">
                <CoursesList keycloak={keycloak} />
            </main>
        </div>
    );
}

export default App;
