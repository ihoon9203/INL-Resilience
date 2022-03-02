import * as React from 'react';
import { useState } from 'react';
import {
  Tabs, Tab, Box, Accordion, AccordionDetails, AccordionSummary, Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddQuestionContainer from './AddQuestionContainer';
import RemoveQuestionContainer from './RemoveQuestionContainer';

const AdminQuestionsFunc = function AdminQuestionsFuncFunc() {
  const [survey, setSurvey] = useState('Finance');
  const [expanded, setExpanded] = React.useState(false);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleChange = (newValue) => {
    setSurvey(newValue);
  };

  return (
    <Box ml={2} sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={survey} onChange={handleChange} aria-label="survey tabs">
          <Tab label="Finance" value="Finance" onClick={() => setSurvey('Finance')} />
          <Tab label="Emergency" value="Emergency" onClick={() => setSurvey('Emergency')} />
          <Tab label="Cyber" value="Cyber" onClick={() => setSurvey('Cyber')} />
          <Tab label="Health" value="Health" onClick={() => setSurvey('Health')} />
        </Tabs>
      </Box>
      <Typography color="primary" variant="h3">
        {survey}
      </Typography>
      <Accordion expanded={expanded === 'panel1'} onChange={handleAccordionChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Add a question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <AddQuestionContainer survey={survey} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleAccordionChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            Remove a question
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RemoveQuestionContainer survey={survey} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AdminQuestionsFunc;
