import React, { useState } from 'react';
import { apiFetch } from './api';

export default function AdminCourses({ onCourseAdded }) {
    const [courseTitle, setCourseTitle] = useState('');

    const submitCourse = async () => {
        await apiFetch('http://localhost:8081/api/learning', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: Date.now().toString(),
                title: courseTitle
            })
        });

        setCourseTitle('');
        onCourseAdded();
    };

    return (
        <div className="admin-container">
            <h3 className="admin-heading">
                <span className="tools-icon">🛠️</span>
                Manage Courses (Admin Access)
            </h3>

            <div className="admin-form">
                <input
                    value={courseTitle}
                    onChange={e => setCourseTitle(e.target.value)}
                    placeholder="Type course name here..."
                    className="course-input"
                />
                <button onClick={submitCourse} className="add-course-btn">
                    Add Course
                </button>
            </div>
        </div>
    );
}