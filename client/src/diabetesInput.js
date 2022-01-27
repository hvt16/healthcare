import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
export default function DiabetesInput() {
  const [diabetes, setDiabetes] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
    8: "",
  });
  const handleChange = (prop) => (event) => {
    setDiabetes({ ...diabetes, [prop]: event.target.value });
    // console.log(diabetes);

  };
  const [result, setResult] = useState("");
  const handleSubmit = (event) => {
    setResult(JSON.stringify("Loading ..."))
    event.preventDefault();
    console.log(event);
    console.log(diabetes);
    // let data=JSON.parse(diabetes);
    /// change it to
    axios
      .post("http://localhost:5000/diabities_prediction", {
        syms: diabetes,
      })
      .then(function (response) {
        console.log(response);
        setResult(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  let labels = [
    "num_preg",
    "glucose_conc",
    "diastolic_bp",
    "insulin",
    "bmi",
    "diab_pred",
    "age",
    "skin",
  ];
  return (
    <div>
    <Box
      component="form"
      noValidate
      autoComplete="off"
      //   onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexWrap: "wrap" }}
      onSubmit={handleSubmit}
    >
        {Object.keys(diabetes).map((key, index) => (
          <TextField
            label={labels[key - 1]}
            id={labels[key-1]}
            sx={{ m: 1, width: "20%" }}
            onChange={handleChange(key)}
            key={labels[key-1]}
          />
        ))}
        <Button
          type="submit"
          variant="contained"
          sx={{
            mx: "auto",
            width: 200,
          }}
        >
          Submit
        </Button>
        
    </Box>
    <h1>{result}</h1>
    </div>
  );
}
