import { useState, useEffect } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'last_login', headerName: 'LastSeen', width: 280 }
];

const fetchDeleteUser = async (ids) => {
  await fetch(`${process.env.REACT_APP_API_URL}/users`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ids
    })
  });
};

const fetchUpdateStatus = async ({ ids, status }) => {
  await fetch(`${process.env.REACT_APP_API_URL}/users/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ids,
      status
    })
  });
};

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const loginUser = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users`);

      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      setUsers(data.users);
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/users/${loginUser.id}`
        );
        if (!response.ok) {
          throw new Error('Error');
        }
        const { user } = await response.json();
        if (
          !user ||
          !(user.status === 'active' || user.status === 'unverified')
        ) {
          navigate('/login');
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchUserData();
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUser = async () => {
    try {
      setIsLoading(true);
      await fetchUpdateStatus({ ids: selectedRows, status: 'blocked' });
      setUsers((prevRows) =>
        prevRows.map((row) =>
          selectedRows.includes(row.id) ? { ...row, status: 'blocked' } : row
        )
      );
      setSelectedRows([]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnblockUser = async () => {
    try {
      setIsLoading(true);
      await fetchUpdateStatus({ ids: selectedRows, status: 'active' });
      setUsers((prevRows) =>
        prevRows.map((row) =>
          selectedRows.includes(row.id) ? { ...row, status: 'active' } : row
        )
      );
      setSelectedRows([]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnRowSelectionModelChange = ({ type, ids }) => {
    if (type === 'include') {
      setSelectedRows([...ids]);
    }
    console.log({ type, ids });
    if (type === 'exclude') {
      const selectedUsers = users
        .filter(({ id }) => ![...ids].includes(id))
        .map(({ id }) => id);
      setSelectedRows(selectedUsers);
    }
  };

  const handleDeleteUser = async () => {
    try {
      setIsLoading(true);
      await fetchDeleteUser(selectedRows);
      setUsers(users.filter((e) => !selectedRows?.includes(e?.id)));
      setSelectedRows([]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Paper sx={{ width: '100%', p: 1 }}>
      <div style={{ marginBottom: 10 }}>
        <Button
          onClick={handleBlockUser}
          disabled={selectedRows.length === 0}
          variant="outlined"
          startIcon={<LockIcon />}
          sx={{ mr: 1 }}
        >
          Block
        </Button>
        <Button
          onClick={handleUnblockUser}
          disabled={selectedRows.length === 0}
          variant="outlined"
          startIcon={<LockOpenIcon />}
          sx={{ mr: 1 }}
        >
          Unblock
        </Button>
        <Button
          onClick={handleDeleteUser}
          disabled={selectedRows.length === 0}
          variant="outlined"
          color="error"
          startIcon={<DeleteForeverOutlinedIcon />}
        >
          Delete
        </Button>
      </div>
      {!isLoading ? (
        <DataGrid
          rows={users}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          onRowSelectionModelChange={(rows) =>
            handleOnRowSelectionModelChange(rows)
          }
        />
      ) : (
        <>Loading</>
      )}
    </Paper>
  );
}
