import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../AppContext';
import { useDispatch } from 'react-redux';
import { deleteComment, editComment } from '../../actions/post.actions';


function EditDeleteComment({ comment, postId }) {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('');
    const uid = useContext(UidContext);

    const dispatch = useDispatch();

    const handleEdit = (e) => {
        if (text) {
            dispatch(editComment(postId, comment._id, text));
            setText('');
            setEdit(false);
        }
    }

    const handleDelete = () => {
        dispatch(deleteComment(postId, comment._id));
    }

    useEffect(() => {
        if (comment.commenterId === uid) setIsAuthor(true);
        else setIsAuthor(false);
    }, [uid, comment.commenterId]);

    return (
        <div className="edit-comment">
            {isAuthor && !edit && (
                <span onClick={() => setEdit(!edit)}>
                    <img src="./img/icons/edit.svg" alt="edit" />
                </span>
            )}
            {isAuthor && edit && (
                <form onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor="text" onClick={() => setEdit(false)}>Annuler</label>
                    <input
                        type="text"
                        name='text'
                        onChange={(e) => setText(e.target.value)}
                        defaultValue={comment.text}
                    />
                    <br />
                    <div className="btn">
                        <span onClick={() => window.confirm('Voulez-vous supprimer cet article ?') && handleDelete()}>
                            <img src="./img/icons/trash.svg" alt="trash" />
                        </span>
                        <input type="submit" value="Enregistrer" />
                    </div>
                </form>
            )}
        </div>
    )
}
export default EditDeleteComment;