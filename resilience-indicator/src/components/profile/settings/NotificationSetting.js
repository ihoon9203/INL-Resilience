import { useState, useEffect } from 'react';
import Axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Alert,
  AlertTitle,
} from '@mui/material';
import { successAlert, errorAlert } from '../../../resources/swal-inl';

const NotificationSetting = function NotificationSettingFunc(props) {
  const [notificationSettings, setNotificationSettings] = useState({});
  const [userEmail, setUserEmail] = useState({});
  const [isEmailVerified, setEmailVerified] = useState();

  useEffect(() => {
    Axios
      .get('/api/notification-settings', { withCredentials: true })
      .then((res) => {
        console.log('res obj in NotificationSettings.js ');
        console.log(res);
        setNotificationSettings(res.data.returnNotifSettings);
        setUserEmail(res.data.userObj.email);
        setEmailVerified(res.data.userObj.emailVerified);
      });
  }, []);

  const handleLogout = () => {
    Axios({
      method: 'POST',
      withCredentials: true,
      url: '/api/logout',
    })
      .then((res) => {
        if (res.status === 200) {
          window.location = '/login';
        } else {
          console.log('failed to logout');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSave = () => {
    Axios({
      method: 'PUT',
      data: notificationSettings,
      withCredentials: true,
      url: '/api/notification-settings',
    })
      .then((res) => {
        if (res.status === 200) {
          successAlert('Notification settings updated successfully!');
        } else {
          errorAlert('Unable to update notification settings');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error');
        console.log(err);
      });
  };

  const handleGeneralChange = (event) => {
    notificationSettings.General = event.target.checked;
    setNotificationSettings(notificationSettings);
  };

  const handleFinancialChange = (event) => {
    notificationSettings.Financial = event.target.checked;
    setNotificationSettings(notificationSettings);
  };

  const handleCyberChange = (event) => {
    notificationSettings.Cyber = event.target.checked;
    setNotificationSettings(notificationSettings);
  };

  const handleHealthChange = (event) => {
    notificationSettings.Health = event.target.checked;
    setNotificationSettings(notificationSettings);
  };

  const handleEmergencyChange = (event) => {
    notificationSettings.Emergency = event.target.checked;
    setNotificationSettings(notificationSettings);
  };

  const handleEmailVerify = () => {
    console.log('handleEmailVerify fire off!!');
    console.log(`User email before sending POST = ${userEmail}`);
    const body = {
      email: userEmail,
    };

    Axios({
      method: 'POST',
      data: body,
      url: '/api/verify-email',
    })
      .then((res) => {
        // redirect to login page upon success
        if (res.status === 200) {
          // successAlert('Password reset! Now you can sign in.')
          console.log('User Email Verification Link Sent Successfully!!!');
          // .then(() => {
          //   //window.location = '/login';
          // });
        }
      })
      .catch((err) => {
        console.log(err);
        // errorAlert('Error trying to reset password');
        console.log('User Email Verification Send FAILED!');
      });
    handleLogout(); // TODO: figure out how to no have to log user out to get banner to go away
  };

  if ('General' in notificationSettings) {
    return (
      <form {...props}>
        {!isEmailVerified && (
          <Alert
            severity="info"
            action={(
              <Button color="inherit" size="small" onClick={handleEmailVerify}>
                Send Verification Link
              </Button>
            )}
          >
            <AlertTitle>Profile Email Has Not Been Verified</AlertTitle>
            You will not recieve email notifications until your email is verified.
            {' '}
          </Alert>
        )}

        <Card>
          <CardHeader
            subheader="Manage email notifications per category"
            title="Resilience News and Updates"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={6}
              wrap="wrap"
            >
              <Grid item>
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked={notificationSettings.General}
                      onChange={handleGeneralChange}
                    />
                  )}
                  label="General"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked={notificationSettings.Financial}
                      onChange={handleFinancialChange}
                    />
                  )}
                  label="Financial"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked={notificationSettings.Cyber}
                      onChange={handleCyberChange}
                    />
                  )}
                  label="Cyber"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked={notificationSettings.Health}
                      onChange={handleHealthChange}
                    />
                  )}
                  label="Health"
                />
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      defaultChecked={notificationSettings.Emergency}
                      onChange={handleEmergencyChange}
                    />
                  )}
                  label="Emergency"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              p: 2,
            }}
          >
            <Button
              color="primary"
              variant="contained"
              onClick={handleSave}
              disabled={!isEmailVerified}
            >
              Save
            </Button>
          </Box>
        </Card>
      </form>
    );
  }

  return (
    <form {...props}>
      <Card>
        <CardHeader
          subheader="Manage email notifications per category"
          title="Resilience News and Updates"
        />
        <Divider />
        <CardContent />
        <Divider />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default NotificationSetting;
