/* eslint-disable react/no-danger */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect, useState } from 'react';
import {
  Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import PreviewIcon from '@mui/icons-material/Preview';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { escapeHtml } from '../../../resources/security';
import { successAlert, errorAlert, warningAlert } from '../../../resources/swal-inl';

const columns = [
  { field: 'title', headerName: 'Title', flex: 1 },
  { field: 'setting', headerName: 'Category', flex: 1 },
  { field: 'sent', headerName: 'Sent', flex: 0.5 },
  { field: 'updatedAt', headerName: 'Last Updated', flex: 1 },
];

function AdminEmailNotifications() {
  const emailNotificationCategories = [
    'General',
    'Financial',
    'Cyber',
    'Health',
    'Emergency',
  ];

  const [emailNotifications, setEmailNotifications] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(0);
  const [loading, setLoading] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewHtml, setPreviewHtml] = useState({
    __html: '',
  });

  const [createOpen, setCreateOpen] = useState(false);

  const [createCategory, setCreateCategory] = useState('');
  const [createCategoryError, setCreateCategoryError] = useState(false);

  const [createFromEmail, setCreateFromEmail] = useState('');
  const [createFromEmailError, setCreateFromEmailError] = useState(false);

  const [createSubject, setCreateSubject] = useState('');
  const [createSubjectError, setCreateSubjectError] = useState(false);

  const [createLogoText, setCreateLogoText] = useState('');
  const [createLogoTextError, setCreateLogoTextError] = useState(false);

  const [createLogoLink, setCreateLogoLink] = useState('');
  const [createLogoLinkError, setCreateLogoLinkError] = useState(false);

  const [createTitle, setCreateTitle] = useState('');
  const [createTitleError, setCreateTitleError] = useState(false);

  const [createButtonText, setCreateButtonText] = useState('');
  const [createButtonTextError, setCreateButtonTextError] = useState(false);

  const [createButtonLink, setCreateButtonLink] = useState('');
  const [createButtonLinkError, setCreateButtonLinkError] = useState(false);

  const [createFirstParagraph, setCreateFirstParagraph] = useState('');
  const [createFirstParagraphError, setCreateFirstParagraphError] = useState(false);

  const [createSecondParagraph, setCreateSecondParagraph] = useState('');
  const [createSecondParagraphError, setCreateSecondParagraphError] = useState(false);

  const [viewOpen, setViewOpen] = useState(false);
  const [viewEmailNotification, setViewEmailNotification] = useState({});

  const [updateOpen, setUpdateOpen] = useState(false);

  const [updateCategory, setUpdateCategory] = useState('');
  const [updateCategoryError, setUpdateCategoryError] = useState(false);

  const [updateFromEmail, setUpdateFromEmail] = useState('');
  const [updateFromEmailError, setUpdateFromEmailError] = useState(false);

  const [updateSubject, setUpdateSubject] = useState('');
  const [updateSubjectError, setUpdateSubjectError] = useState(false);

  const [updateLogoText, setUpdateLogoText] = useState('');
  const [updateLogoTextError, setUpdateLogoTextError] = useState(false);

  const [updateLogoLink, setUpdateLogoLink] = useState('');
  const [updateLogoLinkError, setUpdateLogoLinkError] = useState(false);

  const [updateTitle, setUpdateTitle] = useState('');
  const [updateTitleError, setUpdateTitleError] = useState(false);

  const [updateButtonText, setUpdateButtonText] = useState('');
  const [updateButtonTextError, setUpdateButtonTextError] = useState(false);

  const [updateButtonLink, setUpdateButtonLink] = useState('');
  const [updateButtonLinkError, setUpdateButtonLinkError] = useState(false);

  const [updateFirstParagraph, setUpdateFirstParagraph] = useState('');
  const [updateFirstParagraphError, setUpdateFirstParagraphError] = useState(false);

  const [updateSecondParagraph, setUpdateSecondParagraph] = useState('');
  const [updateSecondParagraphError, setUpdateSecondParagraphError] = useState(false);

  const onSelectionModelChange = (modelChange) => {
    setSelectionModel(modelChange);
  };

  const handleCreateClose = () => {
    setCreateCategoryError(false);
    setCreateFromEmailError(false);
    setCreateSubjectError(false);
    setCreateLogoTextError(false);
    setCreateLogoLinkError(false);
    setCreateTitleError(false);
    setCreateButtonTextError(false);
    setCreateButtonLinkError(false);
    setCreateFirstParagraphError(false);
    setCreateSecondParagraphError(false);
    setCreateOpen(false);

    setCreateCategory('');
  };

  const handleCreateSubmit = () => {
    let error = false;
    if (createCategory === '') {
      setCreateCategoryError(true);
      error = true;
    }
    if (createFromEmail === '') {
      setCreateFromEmailError(true);
      error = true;
    }
    if (createSubject === '') {
      setCreateSubjectError(true);
      error = true;
    }
    if (createLogoText === '') {
      setCreateLogoTextError(true);
      error = true;
    }
    if (createLogoLink === '') {
      setCreateLogoLinkError(true);
      error = true;
    }
    if (createTitle === '') {
      setCreateTitleError(true);
      error = true;
    }
    if (createButtonText === '') {
      setCreateButtonTextError(true);
      error = true;
    }
    if (createButtonLink === '') {
      setCreateButtonLinkError(true);
      error = true;
    }
    if (createFirstParagraph === '') {
      setCreateFirstParagraphError(true);
      error = true;
    }
    if (createSecondParagraph === '') {
      setCreateSecondParagraphError(true);
      error = true;
    }

    // Return if not all required fields are filled
    if (error) return;

    const body = {
      setting: createCategory,
      fromEmail: escapeHtml(createFromEmail),
      subject: escapeHtml(createSubject),
      logoText: escapeHtml(createLogoText),
      logoLink: escapeHtml(createLogoLink),
      title: escapeHtml(createTitle),
      buttonLink: escapeHtml(createButtonLink),
      buttonText: escapeHtml(createButtonText),
      firstParagraph: escapeHtml(createFirstParagraph),
      secondParagraph: escapeHtml(createSecondParagraph),
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: '/api/admin/email-notifications',
    })
      .then((res) => {
        if (res.status === 201) {
          successAlert('Email Notification Created!');
        } else {
          errorAlert('Something went wrong!');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error!');
        console.log(err);
      })
      .finally(() => {
        setSelectionModel([]);
        setTriggerRefresh(triggerRefresh + 1);
      });

    handleCreateClose();
  };

  const onCreateTFChange = (event) => {
    if (event.target.name === 'category') {
      setCreateCategory(event.target.value);
    } else if (event.target.id === 'fromEmail') {
      setCreateFromEmail(event.target.value);
    } else if (event.target.id === 'subject') {
      setCreateSubject(event.target.value);
    } else if (event.target.id === 'logoText') {
      setCreateLogoText(event.target.value);
    } else if (event.target.id === 'logoLink') {
      setCreateLogoLink(event.target.value);
    } else if (event.target.id === 'title') {
      setCreateTitle(event.target.value);
    } else if (event.target.id === 'buttonText') {
      setCreateButtonText(event.target.value);
    } else if (event.target.id === 'buttonLink') {
      setCreateButtonLink(event.target.value);
    } else if (event.target.id === 'firstParagraph') {
      setCreateFirstParagraph(event.target.value);
    } else if (event.target.id === 'secondParagraph') {
      setCreateSecondParagraph(event.target.value);
    }
  };

  const handleViewButtonClick = () => {
    const selectedEmailNotification = emailNotifications.find((x) => x.id === selectionModel[0]);
    setViewEmailNotification(selectedEmailNotification);
    setViewOpen(true);
  };

  const handleCloseView = () => {
    setViewOpen(false);
  };

  const onUpdateTFChange = (event) => {
    if (event.target.name === 'category') {
      setUpdateCategory(event.target.value);
    } else if (event.target.id === 'fromEmail') {
      setUpdateFromEmail(event.target.value);
    } else if (event.target.id === 'subject') {
      setUpdateSubject(event.target.value);
    } else if (event.target.id === 'logoText') {
      setUpdateLogoText(event.target.value);
    } else if (event.target.id === 'logoLink') {
      setUpdateLogoLink(event.target.value);
    } else if (event.target.id === 'title') {
      setUpdateTitle(event.target.value);
    } else if (event.target.id === 'buttonText') {
      setUpdateButtonText(event.target.value);
    } else if (event.target.id === 'buttonLink') {
      setUpdateButtonLink(event.target.value);
    } else if (event.target.id === 'firstParagraph') {
      setUpdateFirstParagraph(event.target.value);
    } else if (event.target.id === 'secondParagraph') {
      setUpdateSecondParagraph(event.target.value);
    }
  };

  const handleUpdateButtonClick = () => {
    const selectedEmailNotification = emailNotifications.find((x) => x.id === selectionModel[0]);
    setUpdateCategory(selectedEmailNotification.setting);
    setUpdateFromEmail(selectedEmailNotification.fromEmail);
    setUpdateSubject(selectedEmailNotification.subject);
    setUpdateLogoText(selectedEmailNotification.logoText);
    setUpdateLogoLink(selectedEmailNotification.logoLink);
    setUpdateTitle(selectedEmailNotification.title);
    setUpdateButtonText(selectedEmailNotification.buttonText);
    setUpdateButtonLink(selectedEmailNotification.buttonLink);
    setUpdateFirstParagraph(selectedEmailNotification.firstParagraph);
    setUpdateSecondParagraph(selectedEmailNotification.secondParagraph);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateCategoryError(false);
    setUpdateFromEmailError(false);
    setUpdateSubjectError(false);
    setUpdateLogoTextError(false);
    setUpdateLogoLinkError(false);
    setUpdateTitleError(false);
    setUpdateButtonTextError(false);
    setUpdateButtonLinkError(false);
    setUpdateFirstParagraphError(false);
    setUpdateSecondParagraphError(false);
    setUpdateOpen(false);

    setUpdateCategory('');
  };

  const handleUpdateSubmit = () => {
    let error = false;
    if (updateCategory === '') {
      setUpdateCategoryError(true);
      error = true;
    }
    if (updateFromEmail === '') {
      setUpdateFromEmailError(true);
      error = true;
    }
    if (updateSubject === '') {
      setUpdateSubjectError(true);
      error = true;
    }
    if (updateLogoText === '') {
      setUpdateLogoTextError(true);
      error = true;
    }
    if (updateLogoLink === '') {
      setUpdateLogoLinkError(true);
      error = true;
    }
    if (updateTitle === '') {
      setUpdateTitleError(true);
      error = true;
    }
    if (updateButtonText === '') {
      setUpdateButtonTextError(true);
      error = true;
    }
    if (updateButtonLink === '') {
      setUpdateButtonLinkError(true);
      error = true;
    }
    if (updateFirstParagraph === '') {
      setUpdateFirstParagraphError(true);
      error = true;
    }
    if (updateSecondParagraph === '') {
      setUpdateSecondParagraphError(true);
      error = true;
    }

    // Return if not all required fields are filled
    if (error) return;

    const body = {
      setting: updateCategory,
      fromEmail: escapeHtml(updateFromEmail),
      subject: escapeHtml(updateSubject),
      logoText: escapeHtml(updateLogoText),
      logoLink: escapeHtml(updateLogoLink),
      title: escapeHtml(updateTitle),
      buttonLink: escapeHtml(updateButtonLink),
      buttonText: escapeHtml(updateButtonText),
      firstParagraph: escapeHtml(updateFirstParagraph),
      secondParagraph: escapeHtml(updateSecondParagraph),
    };

    console.log(body);

    Axios({
      method: 'PUT',
      data: body,
      withCredentials: true,
      url: `/api/admin/email-notifications/${selectionModel[0]}`,
      validateStatus: (status) => status < 500,
    })
      .then((res) => {
        if (res.status === 200) {
          successAlert('Email Notification Updated!');
        } else if (res.status === 409) {
          errorAlert('That Email Notification Already Exists');
        } else {
          errorAlert('Something went wrong!');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error!');
        console.log(err);
      })
      .finally(() => {
        setSelectionModel([]);
        setTriggerRefresh(triggerRefresh + 1);
      });

    handleUpdateClose();
  };

  const handleDeleteButtonClick = () => {
    warningAlert("You won't be able to revert this!", 'Yes, delete!').then((result) => {
      if (result.isConfirmed) {
        if (selectionModel.length === 1) {
          Axios({
            method: 'DELETE',
            withCredentials: true,
            url: `/api/admin/email-notifications/${selectionModel[0]}`,
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Email notification deleted.');
              } else {
                errorAlert('Something went wrong!');
              }
            })
            .catch((err) => {
              errorAlert('Unexpected error!');
              console.log(err);
            })
            .finally(() => {
              setSelectionModel([]);
              setTriggerRefresh(triggerRefresh + 1);
            });
        } else {
          // bulk delete
          const body = {
            ids: selectionModel,
          };
          Axios({
            method: 'DELETE',
            data: body,
            withCredentials: true,
            url: '/api/admin/email-notifications',
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Email notifications deleted.');
              } else {
                errorAlert('Something went wrong!');
              }
            })
            .catch((err) => {
              errorAlert('Unexpected error!');
              console.log(err);
            })
            .finally(() => {
              setSelectionModel([]);
              setTriggerRefresh(triggerRefresh + 1);
            });
        }
      }
    });
  };

  const handleSendClick = () => {
    setLoading(true);
    const emailNotificationId = selectionModel[0];

    const body = {
      emailNotificationId,
    };

    Axios({
      method: 'POST',
      data: body,
      withCredentials: true,
      url: '/api/admin/send-email',
    })
      .then((res) => {
        if (res.status === 200) {
          successAlert('Email Notification Sent!');
        } else {
          errorAlert('Something went wrong!');
        }
      })
      .catch((err) => {
        errorAlert('Unexpected error!');
        console.log(err);
      })
      .finally(() => {
        setSelectionModel([]);
        setLoading(false);
        setTriggerRefresh(triggerRefresh + 1);
      });
  };

  const handlePreviewClick = () => {
    Axios
      .get(`/api/admin/email-notifications/preview/${selectionModel[0]}`, { withCredentials: true })
      .then((res) => {
        setPreviewHtml(res.data);
        setPreviewOpen(true);
      });
  };

  useEffect(() => {
    Axios
      .get('/api/admin/email-notifications', { withCredentials: true })
      .then((res) => {
        setEmailNotifications(res.data);
      });
  }, [triggerRefresh]);

  return (
    <>
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h4">Email Notifications</Typography>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            variant="contained"
            onClick={() => setCreateOpen(true)}
            style={{
              backgroundColor: 'green',
              marginTop: 20,
            }}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            color="warning"
            variant="contained"
            onClick={handleViewButtonClick}
            disabled={selectionModel.length !== 1}
            style={{
              marginTop: 20,
              width: 90,
            }}
          >
            View
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleUpdateButtonClick}
            disabled={selectionModel.length !== 1}
            style={{
              marginTop: 20,
            }}
          >
            Update
          </Button>
        </Grid>
        <Grid item xs={1.5}>
          <Button
            color="error"
            variant="contained"
            disabled={selectionModel.length === 0}
            onClick={handleDeleteButtonClick}
            style={{
              marginTop: 20,
            }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={emailNotifications}
          columns={columns}
          pageSize={5}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionModelChange}
          rowsPerPageOptions={[5]}
        />
      </div>
      <LoadingButton
        variant="contained"
        endIcon={<SendIcon />}
        onClick={handleSendClick}
        loading={loading}
        disabled={selectionModel.length !== 1}
        style={{
          marginTop: 20,
        }}
      >
        Send
      </LoadingButton>
      <Button
        variant="contained"
        color="warning"
        onClick={handlePreviewClick}
        endIcon={<PreviewIcon />}
        disabled={selectionModel.length !== 1}
        style={{
          marginTop: 20,
          marginLeft: 10,
        }}
      >
        Preview
      </Button>
      <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} fullWidth>
        <DialogTitle>Preview</DialogTitle>
        <DialogContent style={{
          padding: 0,
        }}
        >
          <div dangerouslySetInnerHTML={previewHtml} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setPreviewOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={createOpen} onClose={handleCreateClose} fullWidth>
        <DialogTitle>Create Email Notification</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            error={createCategoryError}
            label="Select category"
            name="category"
            onChange={onCreateTFChange}
            required
            select
            SelectProps={{ native: true }}
            value={createCategory}
            variant="outlined"
            style={{
              marginTop: 10,
            }}
          >
            <option
              disabled
              value=""
            />
            {emailNotificationCategories.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            error={createFromEmailError}
            helperText="Enter email of sender"
            margin="dense"
            id="fromEmail"
            onChange={onCreateTFChange}
            label="Sender Email"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createSubjectError}
            helperText="Enter subject of email"
            margin="dense"
            id="subject"
            onChange={onCreateTFChange}
            label="Email Subject"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createLogoTextError}
            helperText="Enter text for logo location in email body"
            margin="dense"
            id="logoText"
            onChange={onCreateTFChange}
            label="Logo Text"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createLogoLinkError}
            helperText="Enter link for logo click in email body"
            margin="dense"
            id="logoLink"
            onChange={onCreateTFChange}
            label="Logo Link"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createTitleError}
            helperText="Enter title for email body content"
            margin="dense"
            id="title"
            onChange={onCreateTFChange}
            label="Email Content Title"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createButtonTextError}
            helperText="Enter text for button in email body"
            margin="dense"
            id="buttonText"
            onChange={onCreateTFChange}
            label="Button Text"
            fullWidth
            variant="standard"
          />
          <TextField
            error={createButtonLinkError}
            helperText="Enter link for button click in email body"
            margin="dense"
            id="buttonLink"
            onChange={onCreateTFChange}
            label="Button Link"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            error={createFirstParagraphError}
            helperText="Enter text for first paragraph of email body"
            margin="dense"
            id="firstParagraph"
            onChange={onCreateTFChange}
            label="First Paragraph"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            error={createSecondParagraphError}
            helperText="Enter text for second paragraph of email body"
            margin="dense"
            id="secondParagraph"
            onChange={onCreateTFChange}
            label="Second Paragraph"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={viewOpen} onClose={handleCloseView} fullWidth>
        <DialogTitle>View Email Notification</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            value={viewEmailNotification.setting}
            margin="dense"
            label="Select category"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.fromEmail}
            helperText="Enter email of sender"
            margin="dense"
            label="Sender Email"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.subject}
            helperText="Enter subject of email"
            margin="dense"
            label="Email Subject"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.logoText}
            helperText="Enter text for logo location in email body"
            margin="dense"
            label="Logo Text"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.logoLink}
            helperText="Enter link for logo click in email body"
            margin="dense"
            label="Logo Link"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.title}
            helperText="Enter title for email body content"
            margin="dense"
            label="Email Content Title"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.buttonText}
            helperText="Enter text for button in email body"
            margin="dense"
            label="Button Text"
            fullWidth
            variant="standard"
          />
          <TextField
            disabled
            value={viewEmailNotification.buttonLink}
            helperText="Enter link for button click in email body"
            margin="dense"
            label="Button Link"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            disabled
            value={viewEmailNotification.firstParagraph}
            helperText="Enter text for first paragraph of email body"
            margin="dense"
            label="First Paragraph"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            disabled
            value={viewEmailNotification.secondParagraph}
            helperText="Enter text for second paragraph of email body"
            margin="dense"
            label="Second Paragraph"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateOpen} onClose={handleUpdateClose} fullWidth>
        <DialogTitle>Update Feedback Category</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            error={updateCategoryError}
            label="Select category"
            name="category"
            onChange={onUpdateTFChange}
            required
            select
            SelectProps={{ native: true }}
            value={updateCategory}
            variant="outlined"
            style={{
              marginTop: 10,
            }}
          >
            <option
              disabled
              value=""
            />
            {emailNotificationCategories.map((option) => (
              <option
                key={option}
                value={option}
              >
                {option}
              </option>
            ))}
          </TextField>
          <TextField
            error={updateFromEmailError}
            value={updateFromEmail}
            helperText="Enter email of sender"
            margin="dense"
            id="fromEmail"
            onChange={onUpdateTFChange}
            label="Sender Email"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateSubjectError}
            value={updateSubject}
            helperText="Enter subject of email"
            margin="dense"
            id="subject"
            onChange={onUpdateTFChange}
            label="Email Subject"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateLogoTextError}
            value={updateLogoText}
            helperText="Enter text for logo location in email body"
            margin="dense"
            id="logoText"
            onChange={onUpdateTFChange}
            label="Logo Text"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateLogoLinkError}
            value={updateLogoLink}
            helperText="Enter link for logo click in email body"
            margin="dense"
            id="logoLink"
            onChange={onUpdateTFChange}
            label="Logo Link"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateTitleError}
            value={updateTitle}
            helperText="Enter title for email body content"
            margin="dense"
            id="title"
            onChange={onUpdateTFChange}
            label="Email Content Title"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateButtonTextError}
            value={updateButtonText}
            helperText="Enter text for button in email body"
            margin="dense"
            id="buttonText"
            onChange={onUpdateTFChange}
            label="Button Text"
            fullWidth
            variant="standard"
          />
          <TextField
            error={updateButtonLinkError}
            value={updateButtonLink}
            helperText="Enter link for button click in email body"
            margin="dense"
            id="buttonLink"
            onChange={onUpdateTFChange}
            label="Button Link"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            error={updateFirstParagraphError}
            value={updateFirstParagraph}
            helperText="Enter text for first paragraph of email body"
            margin="dense"
            id="firstParagraph"
            onChange={onUpdateTFChange}
            label="First Paragraph"
            fullWidth
            variant="standard"
          />
          <TextField
            multiline
            rows={3}
            error={updateSecondParagraphError}
            value={updateSecondParagraph}
            helperText="Enter text for second paragraph of email body"
            margin="dense"
            id="secondParagraph"
            onChange={onUpdateTFChange}
            label="Second Paragraph"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>Cancel</Button>
          <Button onClick={handleUpdateSubmit}>Update</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminEmailNotifications;
