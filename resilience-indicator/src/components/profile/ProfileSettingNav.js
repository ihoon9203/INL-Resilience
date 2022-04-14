import { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const ProfileSettingNav = function ProfileSettingNavFunc({ handleSettingChange }) {
  const [selected, setSelected] = useState('Account');

  const handleChange = (event, value) => {
    setSelected(value);
    handleSettingChange(value);
  };
  return (
    <ToggleButtonGroup
      color="primary"
      orientation="vertical"
      value={selected}
      exclusive
      fullWidth
      onChange={handleChange}
    >
      <ToggleButton value="Account">Account</ToggleButton>
      <ToggleButton value="Notifications">Notifications</ToggleButton>
      <ToggleButton value="Password">Password</ToggleButton>
      <ToggleButton value="Feedback">Feedback</ToggleButton>
      <ToggleButton value="Privacy">Privacy</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default ProfileSettingNav;
