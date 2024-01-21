import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import { likePost, unlikePost } from '../../actions/post.actions';

function LikeButton({ post }) {
    const dispatch = useDispatch();
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext)

    useEffect(() => {
        if (post.likers.includes(uid)) setLiked(true);
        else setLiked(false);
    }, [uid, post.likers, liked]);


    const like = () => {
        console.log(post._id, uid);
        dispatch(likePost(post._id, uid));
        setLiked(true);
    }
    const unlike = () => {
        dispatch(unlikePost(post._id, uid));
        setLiked(false);
    }

    return (
        <div className="like-container">
            {uid === null &&
                <Popup
                    trigger={<img src="./img/icons/heart.svg" alt="like" />}
                    position={["bottom center", "bottom right", "bottom left"]}
                    closeOnDocumentClick
                >
                    <div>Connectez-vous pour aimer un post !</div>
                </Popup>
            }
            {uid && liked === false && (
                <img src="./img/icons/heart.svg" alt="like" onClick={like} />
            )}
            {uid && liked === true && (
                <img src="./img/icons/heart-filled.svg" alt="unlike" onClick={unlike} />
            )}
            <span>{post.likers.length}</span>
        </div>
    )
}
export default LikeButton;