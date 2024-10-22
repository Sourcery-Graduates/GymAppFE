import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import React from "react";

import BigButton from "../components/buttons/BigButton/BigButton";
import MyRoutines from "./myRoutines/MyRoutines";

import "./Routines.scss";
import PublicRoutines from "./publicRoutines/PublicRoutines";

const Routines = () => {
  const [tabValue, setTabValue] = React.useState("my-routines");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <div className="routines-container">
      <div className="routines-top">
        <form className="search-bar">
          <button className="search-button">
            <SearchIcon />
          </button>
          <input
            className="search-field"
            type="search"
            placeholder="Search routines..."
            onChange={() => {}}
          />
        </form>
        <div className="routine-options">
          <BigButton
            className="new-routine-btn"
            content="NEW ROUTINE"
            svgComponent={<AddIcon fontSize="small" />}
          />
        </div>
      </div>
      <div className="routines-filter-bar">
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab value="my-routines" label="My Routines" />
            <Tab value="public-routines" label="Public Routines" />
          </Tabs>
        </Box>
      </div>
      {tabValue === "my-routines" && <MyRoutines />}
      {tabValue === "public-routines" && <PublicRoutines />}
    </div>
  );
};

export default Routines;
