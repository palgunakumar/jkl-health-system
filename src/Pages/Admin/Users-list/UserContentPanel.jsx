import React from "react";
import { Stack, Rate, Panel, Avatar, Whisper, Popover, Button, Tag } from 'rsuite';

const UserContentPanel = ({ data, header, styles }) => {
  const speaker = (
    <Popover title="Description">
      <div
    style={{
      width: 40,
      height: 40,
      background: '#f5f5f5',
      borderRadius: 6,
      marginTop: 2,
      overflow: 'hidden',
      display: 'inline-block'
    }}
  >
    <img loading="lazy"  src={data?.photoURL} width="40" alt={data?.displayName} />
  </div>
      <p>
        <b>Name:</b> {data?.displayName}
      </p>
      <p>
        <b>Email:</b> {data?.email}
      </p>
      <p>
        <b>User ID :</b> {data?.uid}
      </p>
    </Popover>
  );
  const colors = {
    'ADMIN': 'orange',
    'USER': 'green',
    'SUPER_ADMIN': 'red',
    'PATIENT': 'blue',
    'CAREGIVER': 'violet'
  };
  const getProfileUrl = () => {
    if (data.roles.includes("PATIENT")) return `/patients/${data.uid}`;
    if (data.roles.includes("CAREGIVER")) return `/caregivers/${data.uid}`;
    return `/user/profile/${data.uid}`;
  };
  return (
    <>
      <Panel shaded header={<Stack justifyContent='center'>{header}</Stack>} className={styles ? `user-content-panel` : ''}>
      {/* {JSON.stringify(data)} */}
      
      <Stack justifyContent='center' spacing={20} style={{ marginTop: '0px' }}>
        <Stack.Item>
          {
            <Avatar src={data.photoURL} circle size='lg' alt={data.firstName + ' ' + data.lastName} />
          }
        </Stack.Item>
      </Stack>
      
      <Stack justifyContent='center' wrap spacing={5} style={{ marginTop: '20px' }}>
        <Stack.Item>
          {
            data?.displayName
          }
        </Stack.Item>
        </Stack>
<Stack justifyContent='center' wrap spacing={5} style={{marginTop: '10px'}}>
        <Stack.Item>
        <Whisper placement="top" speaker={speaker}>
          <a>{data.email}</a>
        </Whisper>
        </Stack.Item>
        
      </Stack>
<Stack justifyContent='center' spacing={15} wrap style={{marginTop: '10px'}}>{
data.roles.map((role) => (
              <>
              <Tag key={role} color={colors[role]}>{role}</Tag></>
            ))
            }
          </Stack>
      <Stack justifyContent='center' wrap spacing={5}>
        <Stack.Item>
        <Button appearance='link' href={getProfileUrl(data)}>View User Profile</Button>
        </Stack.Item>
      </Stack>
    </Panel>
      
    </>
  )
}
export default UserContentPanel;