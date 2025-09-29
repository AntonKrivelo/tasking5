import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Navigate } from 'react-router-dom';

const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'Name', headerName: 'Name', width: 200 },
  { field: 'Email', headerName: 'Email', width: 200 },
  { field: 'Status', headerName: 'Status', width: 150 },
  { field: 'LastSeen', headerName: 'LastSeen', width: 180 }
];

export default function DataTable() {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  // Загружаем пользователей с бэка
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:4000/admin/users/');
        console.log(res);
        if (!res.ok) throw new Error('Ошибка загрузки пользователей');
        const users = await res.json();

        const formatted = users.map((u) => ({
          id: u.id,
          Name: u.name,
          Email: u.email,
          Status: u.status,
          LastSeen: u.lastSeen || '—'
        }));

        setRows(formatted);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, []);

  // Блокировка и разблокировка локально
  const handleBlockUser = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, Status: 'blocked' } : row
      )
    );
  };

  const handleUnblockUser = () => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        selectedRows.includes(row.id) ? { ...row, Status: 'active' } : row
      )
    );
  };

  const handleDeleteUser = async () => {
    try {
      for (const id of selectedRows) {
        const user = rows.find((r) => r.id === id);
        if (!user) continue;

        const res = await fetch(
          `http://localhost:4000/admin/users/${user.Email}`,
          {
            method: 'DELETE'
          }
        );

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Ошибка при удалении пользователя');
        }
      }

      setRows((prevRows) =>
        prevRows.filter((row) => !selectedRows.includes(row.id))
      );
      setSelectedRows([]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  if (!currentUser || currentUser.status !== 'active') {
    return <Navigate to="/login" replace />;
  }

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
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(ids) => setSelectedRows(ids)}
      />
    </Paper>
  );
}
