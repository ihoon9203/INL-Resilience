import * as React from 'react';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddQuestionContainer from '../components/AddQuestionContainer';

const AdminPage = function AdminPageFunc() {
  const [survey, setSurvey] = useState('Financial');

  const handleChange = (newValue) => {
    setSurvey(newValue);
    // eslint-disable-next-line
    console.log(newValue);
  };

  return (
    <Box ml={2} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={survey} onChange={handleChange} aria-label="survey tabs">
          <Tab label="Financial" value="Financial" onClick={() => setSurvey('Financial')} />
          <Tab label="Emergency" value="Emergency" onClick={() => setSurvey('Emergency')} />
          <Tab label="Cyber" value="Cyber Security" onClick={() => setSurvey('Cyber Security')} />
          <Tab label="Health" value="Public Health" onClick={() => setSurvey('Public Health')} />
        </Tabs>
      </Box>
      <AddQuestionContainer survey={survey} />
    </Box>
  );
};

export default AdminPage;
