import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../Utils';
import FollowHandler from './FollowHandler';


function FriendsHint() {
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendsHint, setFriendsHint] = useState([]);
    const userData = useSelector((state) => state.userReducer);
    const usersData = useSelector((state) => state.usersReducer);

    const notFriendList = () => {
        let array = [];
        usersData.map((user) => {
            if (user._id !== userData._id && !user.followers.includes(userData._id)) {
                return array.push(user._id);
            }
        });
        array.sort(() => 0.5 - Math.random());
        if (window.innerHeight > 780) {
            array = array.slice(0, 5);
        } else if (window.innerHeight > 720) {
            array = array.slice(0, 4);
        } else if (window.innerHeight > 615) {
            array = array.slice(0, 3);
        } else if (window.innerHeight > 540) {
            array = array.slice(0, 1);
        } else {
            array = array.slice(0, 0);
        }
        setFriendsHint(array);
    }

    useEffect(() => {
        if (playOnce && !isEmpty(usersData[0]) && !isEmpty(userData._id)) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [usersData, userData]);

    if (friendsHint.length > 0) return (
        <div className="get-friends-container">
            <h4>Suggestions</h4>
            {isLoading ? <div className="icon"><i className='fas fa-spinner fa-pulse' /></div> : (
                <ul>
                    {friendsHint.map((user) => {
                        for (let i = 0; i < usersData.length; i++) {
                            if (user === usersData[i]._id) {
                                return (
                                    <li key={user} className='user-hint'>
                                        <img src={usersData[i].picture} alt="" />
                                        <p>{usersData[i].pseudo}</p>
                                        <FollowHandler idToFollow={user} type="suggestion" />
                                    </li>
                                )
                            }
                        }
                    })}
                </ul>
            )}
        </div>
    )
}
export default FriendsHint;