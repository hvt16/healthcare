import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DiabetesInput from "./diabetesInput";
import DiseasePrediction from "./diseasePrediction";
import PnumoniaDetection from "./pnumoniaDetection";
import BrainTumor from "./brainTumor";
import { styled } from "@mui/material/styles";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%"
});

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
        <DiseasePrediction />
      </TabPanel>

      {/* second tab for diabities prediction */}
      <TabPanel value={value} index={1}>
        Diabities Prediction ...
        <DiabetesInput />
      </TabPanel>

      {/* thrid tab for xray classification */}
      <TabPanel value={value} index={2}>
        <PnumoniaDetection/>
      </TabPanel>

      {/* brain tumor */}
      <TabPanel value={value} index={3}>
        <BrainTumor/>
      </TabPanel>

    </Box>
  );
}
