import "./Routines.scss";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BigButton from "../components/buttons/BigButton/BigButton";
import { Box } from "@mui/material";
import React from "react";
import RoutineListItem from "./routineListItem/RoutineListItem";

const Routines = () => {
  const [value, setValue] = React.useState("my-routines");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
            value={value}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab value="my-routines" label="My Routines" />
            <Tab value="public-routines" label="Public Routines" />
          </Tabs>
        </Box>
      </div>
      <div className="routine-list-wrapper">
        <RoutineListItem
          id={"1"}
          name={"Arni/Push it as hard as you can to the limit"}
          description={
            "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!"
          }
          likes={123}
          userLikes={true}
        />
        <RoutineListItem
          id={"1"}
          name={"Arni/Push it as hard as you can to the limit"}
          description={
            "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!"
          }
          likes={123}
          userLikes={true}
        />
        <RoutineListItem
          id={"1"}
          name={"Arni/Push it as hard as you can to the limit"}
          description={
            "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!"
          }
          likes={12223}
          userLikes={false}
        />
        <RoutineListItem
          id={"1"}
          name={"Arni/Push it as hard as you can to the limit"}
          description={
            "Benchpress combined with OHP to get the best results during the workout. Motivation: Listen up, champ! You've got a goal in mind, and that goal is within reach. You've got the power within you to crush this workout. Remember why you started. You're not just pushing your body, you're pushing your limits. You're building strength, endurance, and resilience. You're becoming the best version of yourself. This workout is your opportunity to shine. Embrace the burn, the sweat, the challenge. It's a testament to your dedication. You're stronger than you think. Push through the doubt, the fatigue, the whispers of \"give up.\" You've got this! Every rep, every set, every minute is a victory. You're conquering your limitations, building your confidence, and proving to yourself what you're capable of. So, let's go! Let's make this workout count. Let's push harder, go further, and achieve more than we ever thought possible. You've got this!"
          }
          likes={13}
          userLikes={true}
        />
        <RoutineListItem
          id={"1"}
          name={"Arni/Push it as hard as you can to the limit"}
          likes={0}
          userLikes={false}
        />
      </div>
    </div>
  );
};

export default Routines;
