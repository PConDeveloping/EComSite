import React from 'react';
import { Link } from 'react-router-dom';

function ProfileScreen(props) {
    return (
        <div>
            <h1>My Profile</h1>
            <Link to="/products">Add, Edit or Delete Products Here</Link>
        </div>
    )
}


export default ProfileScreen


