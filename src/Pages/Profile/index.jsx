import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Input, Avatar, Divider, Stack } from 'rsuite';
import Loading from '../../Components/Loading/loading';
import { updateProfileInformatio } from '../../redux/auth';

const ProfilePage = ({user, loading, updateProfile}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState();
const [loading1, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if(user){
        setProfile(user);
    }
    setTimeout(() => {
        setLoading(false);
    },[1000])
  }, [user])
  if(loading || loading1) {
    return <Loading />;
  }
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setProfile(prevProfile => ({ ...prevProfile, [field]: value }));
  };
  const handleCancel = () => {
    setIsEditing(false)
  }
  const handleSave = () => {
    // Here, you could save the profile to a server or database
    setIsEditing(false);
    updateProfile(profile)
  };

  return (
    <div style={{ margin: '2% 12% 2% 12%',  }}>        
      <Stack direction='column' spacing={20} style={{height:'90vh'}} alignItems="center" justifyContent='center'>
        <Avatar circle size="xl" src={profile?.photoURL} alt={profile?.displayName} />
        <h2>{profile?.displayName}</h2>

        {isEditing ? (
          <>
            <Input
              value={profile.displayName}
              onChange={(value) => handleChange('displayName', value)}
              placeholder="Name"
            />
          </>
        ) : (
          <>
            <p>Email: {profile?.email}</p>
            <p>Phone: {profile?.phoneNumber ? profile?.phoneNumber : 'Not available'}</p>
          </>
        )}

        <Divider />

        {isEditing ? (
            <Stack spacing={10}>
             <Button onClick={handleCancel} appearance="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} appearance="primary">
            Save
          </Button>
            </Stack>
        ) : (
          <Button onClick={handleEditToggle} appearance="default">
            Edit Profile
          </Button>
        )}
      </Stack>
    </div>
  );
};

const mapStateToProps = (state) => ({
    user: state.auth?.user,
    loading: state.auth?.loading
})
const mapDispatchToProps = (dispatch) => ({
    updateProfile: (user) => dispatch(updateProfileInformatio(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
