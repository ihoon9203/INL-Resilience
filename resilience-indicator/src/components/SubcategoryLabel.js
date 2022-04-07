import React, { useState } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import QuestionList from './QuestionList';

const cardStyle = {
  card: {
    margin: '30px 20px 20px 20px',
  },
};

const SubcategoryLabel = function SubcategoryLabelFunc({ subcatObj, handleNaSubcategoryChange, surveyAnswers }) {
  const [naSelected, setNaFlag] = useState(false);
  const handleChange = () => {
    if (!naSelected) {
      setNaFlag(true);
      handleNaSubcategoryChange(subcatObj, true);
    } else {
      setNaFlag(false);
      handleNaSubcategoryChange(subcatObj, false);
    }
  };

  return (

    <Card style={cardStyle.card}>
      <CardContent>
        <div style={{ float: 'left' }}>
          <Typography
            variant="h5"
            align="left"
            color="primary"
            style={{ width: '100%', height: '90%' }}
          >
            {subcatObj.subcategory}
            <FormControl>
              <FormControlLabel
                value="True"
                control={<Checkbox />}
                onChange={handleChange}
                label="Subcategory not applicable"
                labelPlacement="end"
                style={{
                  width: '100%', height: '90%', paddingLeft: '20px',
                }}
              />
            </FormControl>
          </Typography>

          {!naSelected && (
            <QuestionList questions={subcatObj.Questions} answers={surveyAnswers} />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubcategoryLabel;
