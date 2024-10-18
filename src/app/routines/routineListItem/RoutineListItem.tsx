import React from "react";
import "./RoutineListItem.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const RoutineListItem: React.FC<Props> = (props) => {
  return (
    <div className="routine-list-item">
      <div className="routine-list-item_name">
        <h3>{props.name}</h3>
      </div>
      <div className="routine-list-item_description">
        <p>{props.description}</p>
      </div>
      <div className="routine-list-item_options">
        <MoreVertIcon />
      </div>
    </div>
  );
};

type Props = {
  id: string;
  name: string;
  description: string;
};

export default RoutineListItem;
