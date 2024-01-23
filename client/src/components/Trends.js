import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from './Utils';
import { getTrends } from '../actions/post.actions';
import { NavLink } from 'react-router-dom';


function Trends() {
    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArr = Object.keys(posts).map((i) => posts[i]);
            let sortedArray = postsArr.sort((a, b) => {
                return b.likers.length - a.likers.length;
            });
            sortedArray.length = 3;
            dispatch(getTrends(sortedArray));
        }
    }, [posts])

    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink to="/trending">
                <ul>
                    {!isEmpty(trendList) && !isEmpty(usersData) && trendList.map((post) => {
                        const UserWhoPost = usersData.find(user => post.posterId === user._id);
                        return (
                            <li key={post._id}>
                                <div>
                                    {post.picture && <img src={post.picture} />}
                                    {isEmpty(post.picture) && <img src={UserWhoPost.picture} alt="user-pic" />}
                                </div>
                                <div className="trend-content">
                                    <p>{post.message}</p>
                                    <span>Lire</span>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </NavLink>
        </div>
    )
}
export default Trends;