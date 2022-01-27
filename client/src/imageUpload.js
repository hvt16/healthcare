// import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useState, useEffect } from "react";
const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

export default function ComplexGrid() {
  const [selectedFile, setSelectedFile] = React.useState("");
  const handleSubmitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    console.warn(selectedFile);
    let url = "http://localhost:8000/upload.php";

    axios
      .post(url, formData, {
        // receive two parameter endpoint url ,form data
      })
      .then(console.log("Successful upload"));
  };

// let imgsrc;
  const [imageUrl, setImageUrl] = useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
    // imgsrc = URL.createObjectURL(event.target.files[0]);
  };
  useEffect(() => {
    if (selectedFile) {
      setImageUrl(URL.createObjectURL(selectedFile));
    }
  }, [selectedFile]);

  return (
    <div>
    <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="enter the image" src={imageUrl} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Standard license
              </Typography>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={handleSubmitFile}
              >
                <input type="file" onChange={handleFileSelect} />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </div>
  );
}