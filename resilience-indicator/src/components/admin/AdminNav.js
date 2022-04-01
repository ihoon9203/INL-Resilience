import { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const AdminNav = function AdminNavFunc({ handlePickerValueChange }) {
  const [selected, setSelected] = useState('Feedback');

  const handleChange = (event, value) => {
    setSelected(value);
    handlePickerValueChange(value);
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
      <ToggleButton value="Feedback">Feedback</ToggleButton>
      <ToggleButton value="FeedbackCategories">Feedback Categories</ToggleButton>
      <ToggleButton value="EmailNotifications">Email Notifications</ToggleButton>
      <ToggleButton value="Questions">Survey Questions</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default AdminNav;
