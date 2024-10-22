import { useState } from "react";
import "./MyProfile.scss";
import ProfileRead from "./profileRead/ProfileRead";
import ProfileUpdate from "./profileUpdate/ProfileUpdate";

const MyProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = useState({
        fullname: 'John Doe',
        email: 'john.doe.gym@gmail.com',
        location: 'Los Angeles, CA',
        bio: 'The most dangerous. A beast slayer. A conqueror of conqueror, the goat of all goats. The ultimate needle mover, the head of the table, the tribal chief. In god mode himself'
    });

    const [draftProfile, setDraftProfile] = useState({ ...profile });

    const toggleIsEditing = () => {
        if (isEditing) {
            setDraftProfile({ ...profile });
        }
        setIsEditing(!isEditing);
    }

    const handleDraftProfileChange = (field: string, value: string) => {
        setDraftProfile((prevDraft) => ({
            ...prevDraft,
            [field]: value,
        }));
    };

    const handleSaveProfile = () => {
        setProfile(draftProfile);
        setIsEditing(false);
    };


    return <div className='my_profile'>
        {!isEditing && (<ProfileRead editAction={toggleIsEditing} profile={profile}/> )}
        {isEditing && (<ProfileUpdate cancelAction={toggleIsEditing} profile={draftProfile} updateAction={handleDraftProfileChange} saveAction={handleSaveProfile}/>)}
    </div>;
}

export default MyProfile;