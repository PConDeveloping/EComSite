import React from 'react'
import { useSelector } from 'react-redux';

function AdminScreen(props) {

    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    return (
        <div>
            <h1>Hello {userInfo.name}</h1>
            <h2>Administration Tools</h2>
            
        </div>
    )
}


export default AdminScreen

