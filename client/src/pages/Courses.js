import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { courseAPI } from '../services/api';
import CourseCard from '../components/CourseCard';
import '../styles/Courses.css';

const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchCourses();
    }, [filter]);

    const fetchCourses = async () => {
        try {
            setLoading(true);
            let response;
            
            if (filter === 'premium') {
                response = await courseAPI.getPremium();
            } else if (filter === 'free') {
                response = await courseAPI.getFree();
            } else {
                response = await courseAPI.getAll();
            }
            
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="courses-page">
            <div className="courses-header">
                <h1>Our Courses</h1>
                <p>Discover our range of free and premium courses</p>
            </div>

            <div className="filter-tabs">
                <button 
                    className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    All Courses
                </button>
                <button 
                    className={`filter-tab ${filter === 'free' ? 'active' : ''}`}
                    onClick={() => setFilter('free')}
                >
                    Free
                </button>
                <button 
                    className={`filter-tab ${filter === 'premium' ? 'active' : ''}`}
                    onClick={() => setFilter('premium')}
                >
                    Premium
                </button>
            </div>

            {loading ? (
                <div className="loading">Loading courses...</div>
            ) : (
                <div className="courses-grid">
                    {courses.map(course => (
                        <CourseCard key={course._id} course={course} />
                    ))}
                </div>
            )}

            {!loading && courses.length === 0 && (
                <div className="no-courses">
                    <p>No courses found</p>
                </div>
            )}
        </div>
    );
};

export default Courses;
