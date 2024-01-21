import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import FollowHandler from '../Profil/FollowHandler';
import LikeButton from './LikeButton';


function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [parentUser, setParentUser] = useState(null);

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setParentUser(usersData.find(user => user._id === post.posterId));
            if (parentUser) {
                setIsLoading(false);
            }
        }
    }, [usersData, parentUser])

    return (
        <li className='card-container' key={post._id}>
            {isLoading ? (
                <i className='fas fa-spinner fa-spin'></i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={parentUser.picture} alt="user-pic" />
                    </div>
                    <div className="card-right">
                        <div className="card-header">
                            <div className="pseudo">
                                <h3>{parentUser.pseudo}</h3>
                                {parentUser._id !== userData._id && <FollowHandler idToFollow={parentUser._id} type="card" />}
                            </div>
                            <span>{dateParser(post.createdAt)}</span>
                        </div>
                        <p>{post.message}</p>
                        {post.picture && <img src={post.picture} alt="card-pic" className='card-pic' />}
                        {post.video && (
                            <iframe
                                width="500"
                                height="300"
                                src={post.video}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={post._id}
                            ></iframe>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon">
                                <img src="./img/icons/message1.svg" alt="comment" />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                    </div>
                </>
            )}
        </li>
    )
}
export default Card;