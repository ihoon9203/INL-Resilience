import React, { useEffect, useState } from 'react';
import {
  Typography, Grid, Button,
} from '@mui/material';
import Axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';
import GridCellExpand from './GridCellExpand';
import { errorAlert, successAlert, warningAlert } from '../../../resources/swal-inl';

function renderCellExpand(params) {
  return (
    <GridCellExpand value={params.value || ''} width={params.colDef.computedWidth} />
  );
}

const columns = [
  {
    field: 'feedback', headerName: 'Feedback', flex: 1, renderCell: renderCellExpand,
  },
  {
    field: 'feedbackCategory',
    headerName: 'Feedback Category',
    flex: 1,
    align: 'left',
    renderCell: renderCellExpand,
    valueGetter: (params) => params.row.FeedbackCategory.feedbackCategoryLabel,
  },
  {
    field: 'resolved', headerName: 'Resolved', flex: 0.25, align: 'center',
  },
  {
    field: 'createdAt', headerName: 'Created At', flex: 1, renderCell: renderCellExpand,
  },
];

function AdminFeedback() {
  const [feedback, setFeedback] = useState([]);
  const [selectionModel, setSelectionModel] = useState([]);
  const [triggerRefresh, setTriggerRefresh] = useState(0);

  const onSelectionModelChange = (modelChange) => {
    setSelectionModel(modelChange);
  };

  const handleMarkResolvedButtonClick = () => {
    warningAlert('You can always revert this.', 'Yes, toggle resolved!').then((result) => {
      if (result.isConfirmed) {
        const currentStatus = feedback.find((x) => x.id === selectionModel[0]).resolved;
        const body = { resolved: !currentStatus };
        Axios({
          method: 'PUT',
          data: body,
          withCredentials: true,
          url: `/api/admin/feedback/${selectionModel[0]}`,
        })
          .then((res) => {
            if (res.status === 200) {
              successAlert('Feedback resolved status updated.');
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
    });
  };

  const handleDeleteButtonClick = () => {
    warningAlert("You won't be able to revert this!", 'Yes, delete!').then((result) => {
      if (result.isConfirmed) {
        if (selectionModel.length === 1) {
          Axios({
            method: 'DELETE',
            withCredentials: true,
            url: `/api/admin/feedback/${selectionModel[0]}`,
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Feedback deleted.');
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
            url: '/api/admin/feedback',
          })
            .then((res) => {
              if (res.status === 200) {
                successAlert('Feedback deleted.');
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
      .get('/api/admin/feedback', { withCredentials: true })
      .then((res) => {
        setFeedback(res.data);
      });
  }, [triggerRefresh]);

  return (
    <>
      <Grid container>
        <Grid item xs={7}>
          <Typography variant="h4">Feedback</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleMarkResolvedButtonClick}
            disabled={selectionModel.length !== 1}
            style={{
              marginTop: 20,
            }}
          >
            Toggle Resolved
          </Button>
        </Grid>
        <Grid item xs={1}>
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
          rows={feedback}
          columns={columns}
          pageSize={5}
          checkboxSelection
          selectionModel={selectionModel}
          onSelectionModelChange={onSelectionModelChange}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

export default AdminFeedback;
