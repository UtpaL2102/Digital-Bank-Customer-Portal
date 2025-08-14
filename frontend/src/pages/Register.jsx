import React, { useState } from "react";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register form data:", form);
    navigate("/login");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Left side gradient */}
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
          Join Us!
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.85, textAlign: "center" }}>
          Create an account to get started and access your dashboard
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
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              mb: 2,
              color: "#667eea",
            }}
          >
            Create Account
          </Typography>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: "#fff" },
              }}
            />
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
                "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: "#fff" },
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
                "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: "#fff" },
              }}
            />
            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              fullWidth
              margin="normal"
              required
              sx={{
                "& .MuiInputBase-root": { borderRadius: 2, backgroundColor: "#fff" },
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
                backgroundColor: "#667eea",
                boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
                "&:hover": { backgroundColor: "#5562c1" },
              }}
            >
              Register
            </Button>

            <Button
              fullWidth
              onClick={() => navigate("/login")}
              sx={{
                mt: 2,
                textTransform: "none",
                fontWeight: "medium",
              }}
            >
              Already have an account? Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
