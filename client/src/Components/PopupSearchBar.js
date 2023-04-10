import React from "react";
import './Popup.css';
 
const Popup = props => {
  return (
    <div className="popup-box">
      <div className="box-search">
        {props.content}
      </div>
    </div>
  );
};
 
export default Popup;
