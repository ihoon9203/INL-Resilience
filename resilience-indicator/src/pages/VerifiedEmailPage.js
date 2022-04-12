import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { CssBaseline, Grid, Typography } from '@mui/material';
import useStyles from '../styles';
import EmailTokenInvalidPage from './EmailTokenInvalidPage';

const VerifiedEmailPage = function VerifiedEmailPageFunc() {
  const classes = useStyles();
  const { emailToken } = useParams();
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const body = {
      emailToken,
    };

    Axios({
      method: 'POST',
      data: body,
      url: '/api/validate-email-token',
    })
      .then((res) => {
        if (res.status === 200) {
          setValidated(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (validated) {
    return (
      <>
        <CssBaseline />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item md={8}>
            <Typography
              className="title"
              variant="h3"
              align="center"
              color="primary"
              style={{
                paddingTop: '40px',
              }}
            >
              Your Email Has Been Verified!
            </Typography>
            <Box className={classes.divider2} />
          </Grid>
        </Grid>
      </>
    );
  }
  return (
    <EmailTokenInvalidPage />
  );
};

export default VerifiedEmailPage;
