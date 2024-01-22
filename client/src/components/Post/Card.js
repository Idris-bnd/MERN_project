import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../Utils';
import FollowHandler from '../Profil/FollowHandler';
import LikeButton from './LikeButton';
import { updatePost } from '../../actions/post.actions';
import DeleteCard from './DeleteCard';
import CardComments from './CardComments';


function Card({ post }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdating] = useState(false);
    const [textUpdate, setTextUpdate] = useState(null);
    const [showComments, setShowComments] = useState(false);
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);

    const [parentUser, setParentUser] = useState(null);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isEmpty(usersData)) {
            setParentUser(usersData.find(user => user._id === post.posterId));
            if (parentUser) {
                setIsLoading(false);
            }
        }
    }, [usersData, parentUser]);

    const updateItem = () => {
        if (textUpdate) {
            dispatch(updatePost(post._id, textUpdate));
        }
        setIsUpdating(false);
    }

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
                        {!isUpdated && <p>{post.message}</p>}
                        {isUpdated && (
                            <div className="update-post">
                                <textarea defaultValue={post.message} onChange={(e) => setTextUpdate(e.target.value)} />
                                <div className="button-container">
                                    <button className="btn" onClick={updateItem}>Valider modification</button>
                                </div>
                            </div>
                        )}
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
                        {userData._id === post.posterId && (
                            <div className="btn-container">
                                <div onClick={() => setIsUpdating(!isUpdated)}>
                                    <img src="./img/icons/edit.svg" alt="edit" />
                                </div>
                                <DeleteCard id={post._id} />
                            </div>
                        )}
                        <div className="card-footer">
                            <div className="comment-icon" onClick={() => setShowComments(!showComments)}>
                                <img src="./img/icons/message1.svg" alt="comment" />
                                <span>{post.comments.length}</span>
                            </div>
                            <LikeButton post={post} />
                            <img src="./img/icons/share.svg" alt="share" />
                        </div>
                        {showComments && <CardComments post={post} />}
                    </div>
                </>
            )}
        </li>
    )
}
export default Card;