import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';

// TODO: connect privacy documents and make viewable
// TODO: allow cookie customization?

const PrivacySetting = function PrivacySettingFunc() {
  return (
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
              Read Privacy Policy
            </Typography>
            <Button
              color="primary"
              variant="contained"
            >
              Privacy Policy
            </Button>
          </Grid>
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
              Read Terms of Use
            </Typography>
            <Button
              color="primary"
              variant="contained"
            >
              Terms of Use
            </Button>
          </Grid>
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
              Set Cookie Preference
            </Typography>
            <Button
              color="primary"
              variant="contained"
            >
              Cookie Preferences
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PrivacySetting;
