import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import { useState } from "react";
import { useForm } from "react-hook-form";

import CustomizedTables from "./CustomizedPrescription";
import DiabetesInput from "./diabetesInput";
import DiseasePrediction from "./diseasePrediction";

//temp image upload check
import ButtonBase from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import ComplexGrid from "./imageUpload";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";


// edits from hvt
import { useEffect } from "react";
import axios from "axios";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});



function createData(name, netmeds, mg, pharmeasy) {
  return { name, netmeds,mg,pharmeasy};
}



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyFormHelperText() {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return "This field is being focused";
    }

    return "Helper text";
  }, [focused]);

  return <FormHelperText>{helperText}</FormHelperText>;
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  // let myArray = [];
  // const [rows,setRows]=useState(Array.from([
  //   createData('Medicine name', "netmeds", "1mg", "pharmeasy"),
  // ]));
  // const [medicines,setMedicines]=useState([]);
  

  // const [formValue, setFormValues] = React.useState({});
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  // const { register, handleSubmit } = useForm();
  // const [result, setResult] = useState("");
  // const [resultPercentage, setResultPercentage] = useState("");
  
  const [xRayResult, setXrayResult] = useState("");
  const [btResult, setBtResult] = useState("");
  // onsubmit function
  // const onSubmit = (data) => {
  //   setResult(JSON.stringify(data));
  // };

  // // on submit for disease prediction
  // const onSubmit = (data) => {
  //   setResult("Loading ...");
  //   setResultPercentage("");
  //   axios.post(
  //     "http://localhost:5000/disease_prediction_using_symptoms",
  //     {  syms:data }
  //   ).then(function (response) {
  //     console.log(response);
  //     myArray = response.data.split("@");
  //     setMedicines(myArray[2].split(", "));
  //     console.log("these are medicines : " + medicines.length);
  //     // temp edits
  //     let v = []
  //     for(let i=0;i<medicines.length;i++){
  //       v.push(createData(medicines[i], 'netmeds', 'mg', 'pharmeasy'));
  //     }
  //     //
  //     // setRows(Array.from([createData(medicines, 'netmeds', 'mg', 'pharmeasy'),]));
  //     setRows(v);
  //     console.log(v);
  //     setResult(JSON.stringify(myArray[0]));
  //     setResultPercentage(JSON.stringify(myArray[1]));
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // };

  const [imageUrl, setImageUrl] = useState(null);
  const [imageUrlBt, setImageUrlBt] = useState(null);
  // on submit and file upload for xray prediction
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFileBt, setSelectedFileBt] = React.useState(null);
  const handleSubmitFile = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFile);
    console.log(formData);
    console.warn(selectedFile);
    let url = "http://localhost:5000/xray_prediction";
    setXrayResult("Loading...");
    axios.post(url, formData, { // receive two parameter endpoint url ,form data 
    })
    .then(function (response) {
      console.log(response);
      setXrayResult(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // on submit and brain tumore prediction
  // const [selectedFilebt, setSelectedFilebt] = React.useState(null);
  const handleSubmitFilebt = (event) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("selectedFile", selectedFileBt);
    console.log(formData);
    console.warn(selectedFileBt);
    let url = "http://localhost:5000/brain_tumor_prediction";
    setBtResult("Loading...");
    axios.post(url, formData, { // receive two parameter endpoint url ,form data 
    })
    .then(function (response) {
      console.log(response);
      setBtResult(response.data);
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

  const handleFileSelectBt = (event) => {
    setSelectedFileBt(event.target.files[0])
  }
  useEffect(() => {
    if (selectedFileBt) {
      setImageUrlBt(URL.createObjectURL(selectedFileBt));
    }
  }, [selectedFileBt]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Disease Prediction" {...a11yProps(0)} />
          <Tab label="Diabities" {...a11yProps(1)} />
          <Tab label="Pnumonia Detection" {...a11yProps(2)} />
          <Tab label="Brain Tumor Detection" {...a11yProps(3)} />
        </Tabs>
      </Box>
      {/* first tab for disease prediction */}
      <TabPanel value={value} index={0}>
      Enter The symptoms
        <DiseasePrediction/>
        {/* <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput {...register("symptoms")} placeholder="Please enter text" />
            <MyFormHelperText />
          </FormControl>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Submit
            </Button>
            <h1>{result}</h1>
            <h2>{resultPercentage}</h2>
            <CustomizedTables rows={rows} medicines={medicines} />
        </Box> */}
      </TabPanel>

      {/* second tab for diabities prediction */}
      <TabPanel value={value} index={1}>
        Diabities Prediction ...
        <DiabetesInput/>   
      </TabPanel>

      {/* thrid tab for xray classification */}
      <TabPanel value={value} index={2}>
      {/* <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileSelect}/>
      <input type="submit" value="Upload File" />
    </form> */}
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
                Upload X-Ray image
              </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmitFile}>
        <input type="file" onChange={handleFileSelect}/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Submit
            </Button>
            <p>{xRayResult}</p>
        </Box>
        </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
      </TabPanel>

      {/* brain tumor */}
      <TabPanel value={value} index={3}>
      <Paper sx={{ p: 2, margin: "auto", maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="" src={imageUrlBt} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                Upload Brain image
              </Typography>
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmitFilebt}>
        <input type="file" onChange={handleFileSelectBt}/>
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
            Submit
            </Button>
            <p>{btResult}</p>
        </Box>
        </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
      </TabPanel>
      
    </Box>
  );
}
