import { CircularProgress, Box } from "@mui/material";

export default function Loader() {
  return (
    <Box display="flex" justifyContent="center" p={2}>
      <CircularProgress />
    </Box>
  );
}
