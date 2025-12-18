import React, { useEffect, useState } from 'react';
import { apiFetch } from './api';
import AdminCourses from './AdminCourses';
import keycloakInstance from './keycloak.js';

export default function CoursesList() {
    const [coursesList, setCoursesList] = useState([]);

    const loadCourses = () => {
        apiFetch('http://localhost:8081/api/learning')
            .then(res => res.json())
            .then(setCoursesList)
            .catch(console.error);
    };

    useEffect(() => {
        loadCourses();
    }, []);

    return (
        <div className="courses-wrapper">
            <h2 className="page-title">
                <span className="book-icon">📚</span>
                Available Courses
            </h2>

            <ul className="courses-listing">
                {coursesList.map(course => (
                    <li key={course.id} className="course-item">
                        <span className="course-title">{course.title}</span>
                        <span className="course-id-badge">ID: {course.id}</span>
                    </li>
                ))}
            </ul>

            {keycloakInstance?.hasRealmRole('ROLE_ADMIN') && (
                <div className="admin-area">
                    <AdminCourses onCourseAdded={loadCourses} />
                </div>
            )}
        </div>
    );
}