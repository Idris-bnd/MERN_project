import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from './Utils';
import Card from './Post/Card';


function Thread() {
    const [loadPost, setLoadPost] = useState(true);
    const [count, setCount] = useState(5);
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.postReducer);

    const loadMore = () => {
        const calcul = window.innerHeight + document.documentElement.scrollTop + 1;
        const calcul2 = document.scrollingElement.scrollHeight;
        if (calcul > calcul2) {
            setLoadPost(true);
        }
    }

    useEffect(() => {
        if (loadPost) {
            dispatch(getPosts(count));
            setLoadPost(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadPost]);

    return (
        <div className='thread-container'>
            <ul>
                {!isEmpty(posts[0]) && posts.map((post) => (
                    <Card post={post} key={post._id} />
                ))}
            </ul>
        </div>
    )
}
export default Thread;