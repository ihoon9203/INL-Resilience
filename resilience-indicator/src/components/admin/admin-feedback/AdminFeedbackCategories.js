import { useEffect, useState } from 'react';
import {
  Typography, Grid, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField,
} from '@mui/material';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import { escapeHtml } from '../../../resources/security';
import { successAlert, errorAlert, warningAlert } from '../../../resources/swal-inl';

const columns = [
  { field: 'feedbackCategoryLabel', headerName: 'Category', flex: 1 },
  { field: 'createdAt', headerName: 'Created At', flex: 1 },
  { field: 'updatedAt', headerName: 'Updated At', flex: 1 },
];

function AdminFeedbackCategories() {
  const [feedbackCategories, setFeedbackCategories] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  const [createOpen, setCreateOpen] = useState(false);
  const [createFeedbackCategory, setCreateFeedbackCategory] = useState('');
  const [createError, setCreateError] = useState(false);

  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateFeedbackCategory, setUpdateFeedbackCategory] = useState('');
  const [updateError, setUpdateError] = useState(false);

  const onSelectionModelChange = (modelChange) => {
    setSelectionModel(modelChange);
  };

  const handleCreateClose = () => {
    setCreateError(false);
    setCreateOpen(false);
  };

  const handleCreateSubmit = () => {
    if (createFeedbackCategory === '') {
      setCreateError(true);
    } else {
      const body = {
        feedbackCategoryLabel: escapeHtml(createFeedbackCategory),
      };

      Axios({
        method: 'POST',
        data: body,
        withCredentials: true,
        url: '/api/admin/feedback-categories',
      })
        .then((res) => {
          if (res.status === 201) {
            successAlert('Feedback Category Created!');
          } else {
            errorAlert('Something went wrong!');
          }
        })
        .catch((err) => {
          errorAlert('Unexpected error!');
          console.log(err);
        })
        .finally(() => {
          setTriggerRefresh(triggerRefresh + 1);
        });

      handleCreateClose();
    }
  };

  const onCreateTFChange = (event) => {
    setCreateFeedbackCategory(event.target.value);
  };

  const onUpdateTFChange = (event) => {
    setUpdateFeedbackCategory(event.target.value);
  };

  const handleUpdateButtonClick = () => {
    const selectedText = feedbackCategories.find((x) => x.id === selectionModel[0]).feedbackCategoryLabel;
    setUpdateFeedbackCategory(selectedText);
    setUpdateOpen(true);
  };

  const handleUpdateClose = () => {
    setUpdateError(false);
    setUpdateOpen(false);
  };

  const handleUpdateSubmit = () => {
    if (updateFeedbackCategory === '') {
      setUpdateError(true);
    } else {
      const body = {
        feedbackCategoryLabel: escapeHtml(updateFeedbackCategory),
      };

      Axios({
        method: 'PUT',
        data: body,
        withCredentials: true,
        url: `/api/admin/feedback-categories/${selectionModel[0]}`,
      })
        .then((res) => {
          if (res.status === 200) {
            successAlert('Feedback Category Created!');
          } else {
            errorAlert('Something went wrong!');
          }
        })
        .catch((err) => {
          errorAlert('Unexpected error!');
          console.log(err);
        })
        .finally(() => {
          setTriggerRefresh(triggerRefresh + 1);
        });

      handleUpdateClose();
    }
  };

  const handleDeleteButtonClick = () => {
    warningAlert("You won't be able to revert this!", 'Yes, delete!').then((result) => {
      if (result.isConfirmed) {
        if (selectionModel.length === 1) {
          Axios({
            method: 'DELETE',
            withCredentials: true,
            url: `/api/admin/feedback-categories/${selectionModel[0]}`,
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Feedback category deleted.');
              } else {
                errorAlert('Something went wrong!');
              }
            })
            .catch((err) => {
              errorAlert('Unexpected error!');
              console.log(err);
            })
            .finally(() => {
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
            url: '/api/admin/feedback-categories',
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Feedback categories deleted.');
              } else {
                errorAlert('Something went wrong!');
              }
            })
            .catch((err) => {
              errorAlert('Unexpected error!');
              console.log(err);
            })
            .finally(() => {
              setTriggerRefresh(triggerRefresh + 1);
            });
        }
      }
    });
  };

  useEffect(() => {
    Axios
      .get('/api/feedback-categories', { withCredentials: true })
      .then((res) => {
        const sortedResults = res.data.sort(
          (a, b) => ((a.feedbackCategoryValue > b.feedbackCategoryValue) ? 1 : -1),
        );
        setFeedbackCategories(sortedResults);
      });
  }, [triggerRefresh]);

  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h4">Feedback Categories</Typography>
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
            color="secondary"
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
          rows={feedbackCategories}
          columns={columns}
          pageSize={5}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionModelChange}
          rowsPerPageOptions={[5]}
        />
      </div>
      <Dialog open={createOpen} onClose={handleCreateClose} fullWidth>
        <DialogTitle>Create Feedback Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={createError}
            helperText="Enter feedback category name"
            margin="dense"
            id="name"
            onChange={onCreateTFChange}
            label="Feedback Category"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateClose}>Cancel</Button>
          <Button onClick={handleCreateSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={updateOpen} onClose={handleUpdateClose} fullWidth>
        <DialogTitle>Update Feedback Category</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            error={updateError}
            helperText="Update feedback category"
            value={updateFeedbackCategory}
            margin="dense"
            id="name"
            onChange={onUpdateTFChange}
            label="Feedback Category"
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

export default AdminFeedbackCategories;
