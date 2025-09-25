import DataTable from './components/DataTable/DataTable';
import Container from '@mui/material/Container';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container
        sx={{
          py: { xs: 5, md: 10 },
          px: { xs: 1, sm: 2 },
        }}
      >
        <DataTable />
      </Container>
    </div>
  );
}

export default App;
