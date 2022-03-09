import * as React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import axios from "axios";

const Img = styled("img")({
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%"
});

export default function BrainTumor() {
    const [result, setResult] = useState("");
    const [imageUrl, setImageUrl] = useState(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const handleSubmitFile = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        console.log(formData);
        console.warn(selectedFile);
        let url = "http://localhost:5000/brain_tumor_prediction";
        setResult("Loading...");
        axios.post(url, formData, { // receive two parameter endpoint url ,form data 
        })
            .then(function (response) {
                console.log(response);
                setResult(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
    }
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
                            <Img alt="" src={imageUrl} />
                        </ButtonBase>
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1" component="div">
                                    Upload Brain image
                                </Typography>
                                <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmitFile}>
                                    <input type="file" onChange={handleFileSelect} />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                    >
                                        Submit
                                    </Button>
                                    <p>{result}</p>
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}