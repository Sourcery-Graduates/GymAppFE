import React from "react";
import "./RoutineListItem.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";

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
      <div className="likes-container">
        <div className="likes-number">
          <p>{props.likes}</p>
        </div>
        <div className={`likes-icon ${props.userLikes ? "active" : ""}`}>
          <ThumbUpOffAltIcon fontSize="small" />
        </div>
      </div>
    </div>
  );
};

type Props = {
  id: string;
  name: string;
  description?: string;
  likes: number;
  userLikes: boolean;
};

export default RoutineListItem;
