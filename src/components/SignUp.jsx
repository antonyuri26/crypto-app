import React from "react";
import { useState } from "react";
import styled from "styled-components";

import {
  Button,
  Grid,
  Container,
  TextField,
  FormControlLabel,
  Checkbox,
  Avatar,
  Box,
} from "@mui/material";

import LockIcon from "@mui/icons-material/Lock";

const StyledButton = styled(Button)({
  "&:hover": {
    backgroundColor: "#fff",
    color: "#000",
  },
});

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };
  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Box sx={{ display: "flex", justifyContent: "center", mb: "2rem" }}>
          <Avatar>
            <LockIcon />
          </Avatar>
        </Box>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
                sx={{ marginBottom: "2rem" }}
              />
            </Grid>
          </Grid>
          <StyledButton
            type="submit"
            size="lg"
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "secondary.main", color: "text.secondary" }}
          >
            Sign Up
          </StyledButton>
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
