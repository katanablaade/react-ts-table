import { Container, Typography } from "@mui/material";
import { DataTable } from "./components/DataTable";
import { ActionsBar } from "./components/ActionsBar";

function App() {
  return (
    <Container maxWidth='xl' sx={{ mt: 4 }}>
      <Typography variant='h3' gutterBottom>
        Таблица сотрудников
      </Typography>
      <ActionsBar />
      <DataTable />
    </Container>
  );
}

export default App;
