import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login form data:", form);
    navigate("/dashboard");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side illustration */}
      <Box
        sx={{
          flex: 1,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          flexDirection: "column",
          px: 5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
          Welcome Back!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85 }}>
          Enter your credentials to access your dashboard
        </Typography>
      </Box>

      {/* Right side form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 5,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Paper
          elevation={12}
          sx={{
            p: 5,
            borderRadius: 4,
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
  variant="h4"
  gutterBottom
  sx={{ 
    textAlign: "center", 
    fontWeight: "bold", 
    mb: 2,
    color: "#667eea"  // updated color
  }}
>
  Sign In
</Typography>


          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                },
              }}
            />
            <TextField
              label="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiInputBase-root": {
                  borderRadius: 2,
                  backgroundColor: "#fff",
                },
              }}
            />

            <Button
  type="submit"
  variant="contained"
  fullWidth
  sx={{
    mt: 3,
    py: 1.5,
    borderRadius: 3,
    fontWeight: "bold",
    textTransform: "none",
    backgroundColor: "#667eea", // changed to desired color
    boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
    "&:hover": {
      backgroundColor: "#5562c1", // slightly darker on hover
    },
  }}
>
  Login
</Button>


            <Button
              color="secondary"
              fullWidth
              onClick={() => navigate("/register")}
              sx={{
                mt: 2,
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              New here? Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

