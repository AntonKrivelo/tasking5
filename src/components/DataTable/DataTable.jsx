import { useState, useEffect } from 'react';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'status', headerName: 'Status', width: 150 },
  { field: 'last_login', headerName: 'LastSeen', width: 280 }
];

export default function DataTable() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4001/users');

      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      console.log(data);
      setUsers(data.users);
    } catch (err) {
      console.error('Error:', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUser = () => {
    setUsers((prevRows) =>
      prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, Status: 'blocked' } : row
      )
    );
  };

  const handleUnblockUser = () => {
    setUsers((prevRows) =>
      prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, Status: 'active' } : row
      )
    );
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
          // onClick={handleDeleteUser}
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
          onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
        />
      ) : (
        <>Loading</>
      )}
    </Paper>
  );
}
