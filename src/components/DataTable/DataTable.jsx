import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Navigate } from 'react-router-dom';
import './DataTable.css';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'Name', headerName: 'Name', width: 230 },
  { field: 'Email', headerName: 'Email', width: 250 },
  { field: 'Status', headerName: 'Status', width: 150 },
  { field: 'LastSeen', headerName: 'LastSeen', width: 250 },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const formatted = users.map((u) => ({
      id: u.id,
      Name: u.name,
      Email: u.email,
      Status: u.status,
      LastSeen: u.lastSeen || '—',
    }));
    setRows(formatted);
  }, []);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (
    !currentUser ||
    currentUser.status !== 'active' ||
    currentUser.deleted ||
    currentUser.status === 'blocked'
  ) {
    return <Navigate to="/login" replace />;
  }

  const updateRows = (newRows) => {
    setRows(newRows);
    const users = newRows.map((r) => ({
      id: r.id,
      name: r.Name,
      email: r.Email,
      password: '',
      status: r.Status,
      deleted: r.Status === 'deleted',
      lastSeen: r.LastSeen,
    }));
    localStorage.setItem('users', JSON.stringify(users));
  };

  const handleBlockUser = () => {
    const newRows = rows.map((row) =>
      selectedRows.includes(row.id) ? { ...row, Status: 'blocked' } : row,
    );
    updateRows(newRows);
  };

  const handleUnblockUser = () => {
    const newRows = rows.map((row) =>
      selectedRows.includes(row.id) ? { ...row, Status: 'active' } : row,
    );
    updateRows(newRows);
  };

  const handleDeleteUser = () => {
    const newRows = rows.map((row) =>
      selectedRows.includes(row.id) ? { ...row, Status: 'deleted' } : row,
    );
    updateRows(newRows);
    setSelectedRows([]);
  };

  return (
    <Paper sx={{ width: '100%', p: 1 }}>
      <div className="table-btns">
        <Button
          onClick={handleBlockUser}
          disabled={selectedRows.length === 0}
          variant="outlined"
          startIcon={<LockIcon />}
        >
          Block
        </Button>
        <Button
          onClick={handleUnblockUser}
          disabled={selectedRows.length === 0}
          variant="outlined"
          startIcon={<LockOpenIcon />}
        >
          Unblock
        </Button>
        <Button
          onClick={handleDeleteUser}
          sx={{ borderColor: '#FF9C9C' }}
          color="error"
          variant="outlined"
          disabled={selectedRows.length === 0}
          startIcon={<DeleteForeverOutlinedIcon />}
        >
          Delete
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={({ ids, type }) => {
          if (type === 'include') {
            setSelectedRows([...ids]);
          }
          if (type === 'exclude') {
            const excludedIds = [...ids];
            const deletRows = rows
              .filter((r) => {
                return !excludedIds.includes(r.id);
              })
              .map(({ id }) => id);
            setSelectedRows([...deletRows]);
          }
        }}
        sx={{ border: 0, height: 400, width: '100%' }}
      />
    </Paper>
  );
}
