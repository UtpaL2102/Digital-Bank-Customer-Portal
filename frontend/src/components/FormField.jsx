import { TextField } from "@mui/material";

export default function FormField({ label, ...props }) {
  return (
    <TextField
      label={label}
      fullWidth
      margin="normal"
      {...props}
    />
  );
}
