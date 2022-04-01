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
} from '@mui/material';
import { successAlert, errorAlert } from '../../../resources/swal-inl';

const NotificationSetting = function NotificationSettingFunc(props) {
  const [notificationSettings, setNotificationSettings] = useState({});

  useEffect(() => {
    Axios
      .get('/api/notification-settings', { withCredentials: true })
      .then((res) => {
        setNotificationSettings(res.data);
      });
  }, []);

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

  if ('General' in notificationSettings) {
    return (
      <form {...props}>
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
              <Grid
                item
                md={4}
                sm={6}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
                xs={12}
              >
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
