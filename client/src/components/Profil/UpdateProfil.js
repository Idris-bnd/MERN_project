import React, { useState } from 'react';
import LeftNav from '../LeftNav';
import { useDispatch, useSelector } from 'react-redux'
import UploadImg from './UploadImg';
import { updateBio } from '../../actions/user.actions';
import { dateParser } from '../Utils';
import FollowHandler from './FollowHandler';


function UpdateProfil() {
    const dispatch = useDispatch();
    const [bio, setBio] = useState('');
    const [updateForm, SetUpdateForm] = useState(false);
    const userData = useSelector((state) => state.userReducer);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    const usersData = useSelector((state) => state.usersReducer);

    const handleUpdate = (e) => {
        dispatch(updateBio(userData._id, bio));
        SetUpdateForm(false);
    }

    return (
        <div className="profil-container">
            <LeftNav />
            <h1>Profil de {userData.pseudo}</h1>
            <div className="update-container">
                <div className="left-part">
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user-pic" />
                    <UploadImg />
                    {/* <p>{errors.maxSize}</p>
                    <p>{errors.format}</p> */}
                </div>
                <div className="right-part">
                    <div className="bio-update">
                        <h3>Bio</h3>
                        {updateForm === false ? (
                            <>
                                <p onClick={() => SetUpdateForm(!updateForm)}>{userData.bio}</p>
                                <button onClick={() => SetUpdateForm(!updateForm)}>Modifier ma bio</button>
                            </>
                        ) : (
                            <>
                                <textarea
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    defaultValue={userData.bio}
                                    onChange={(e) => setBio(e.target.value)}
                                ></textarea>
                                <button onClick={handleUpdate}>Valider modification</button>
                            </>
                        )}
                    </div>
                    <h4>Membre depuis le: {dateParser(userData.createdAt)}</h4>

                    <h5 onClick={() => setFollowingPopup(!followingPopup)}>Abonnements : {userData.following ? userData.following.length : 0}</h5>
                    <h5 onClick={() => setFollowersPopup(!followersPopup)}>Abonnés : {userData.followers ? userData.followers.length : 0}</h5>
                </div>

            </div>
            {followingPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnements</h3>
                        <span onClick={() => setFollowingPopup(!followingPopup)} className='cross'>&#10005;</span>
                        <ul>
                            {usersData.map((user) =>
                                userData.following.includes(user._id) && (
                                    <li key={user._id}>
                                        <img src={user.picture} alt="user-pic" />
                                        <h4>{user.pseudo}</h4>
                                        <div className="follow-handler">
                                            <FollowHandler idToFollow={user._id} type="suggestion" />
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
            {followersPopup && (
                <div className="popup-profil-container">
                    <div className="modal">
                        <h3>Abonnés</h3>
                        <span onClick={() => setFollowersPopup(!followersPopup)} className='cross'>&#10005;</span>
                        <ul>
                            {usersData.map((user) =>
                                userData.followers.includes(user._id) && (
                                    <li key={user._id}>
                                        <img src={user.picture} alt="user-pic" />
                                        <h4>{user.pseudo}</h4>
                                        <div className="follow-handler">
                                            <FollowHandler idToFollow={user._id} type="suggestion" />
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}
export default UpdateProfil;