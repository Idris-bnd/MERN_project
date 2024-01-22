import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FollowHandler from '../Profil/FollowHandler';
import { timestampParser } from '../Utils';
import { addComment, getPosts } from '../../actions/post.actions';
import EditDeleteComment from './EditDeleteComment';


function CardComments({ post }) {
    const [text, setText] = useState('');
    const usersData = useSelector((state) => state.usersReducer);
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handleComment = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(addComment(post._id, userData._id, text, userData.pseudo))
                .then(() => dispatch(getPosts()));
            setText('');
        }
    };

    return (
        <div className="elements-container">
            {post.comments.map((comment) => {
                const UserWhoComment = usersData.find(user => comment.commenterId === user._id);
                return (
                    <div key={comment._id} className={comment.commenterId === userData._id ? 'comment-container client' : 'comment-container'}>
                        <div className="left-part">
                            <img src={UserWhoComment.picture} alt="user-pic" />
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{UserWhoComment.pseudo}</h3>
                                    {UserWhoComment._id !== userData._id && (
                                        <FollowHandler idToFollow={UserWhoComment._id} type="card" />
                                    )}
                                </div>
                                <span>{timestampParser(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteComment comment={comment} postId={post._id} />
                        </div>
                    </div>
                )
            })}
            {userData._id && (
                <form onSubmit={handleComment} className='comment-form'>
                    <input
                        type="text"
                        name='text'
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder='Laisser un commentaire'
                    />
                    <br />
                    <input type="submit" value='Envoyer' />
                </form>
            )}
        </div>
    )
}
export default CardComments;