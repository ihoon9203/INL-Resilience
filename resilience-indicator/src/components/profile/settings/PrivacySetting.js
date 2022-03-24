import * as React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const PrivacySetting = function PrivacySettingFunc() {
  const [consentOpen, setConsentOpen] = React.useState(false);
  const handleConsentClose = () => setConsentOpen(false);
  const handleConsentOpen = () => setConsentOpen(true);

  return (
    <>
      <Dialog
        open={consentOpen}
        onClose={handleConsentClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle textAlign="center">
          Consent Form
        </DialogTitle>
        <DialogContent
          style={{
            height: '600px',
          }}
        >
          <embed
            src="./assets/consent-form.pdf"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConsentClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Card>
        <CardHeader
          subheader="Privacy information"
          title="Privacy"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography
                color="textPrimary"
                gutterBottom
                variant="h6"
              >
                Read Consent Form
              </Typography>
              <Button
                color="primary"
                variant="contained"
                onClick={handleConsentOpen}
              >
                Consent Form
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

export default PrivacySetting;
