import React from "react";

const DropDown = ({ content }) => {
  return (
    <div className="g-dropdown c-dropdown-container">
      <img src={content.imgUrl} alt='img'></img>
      <div>{content.name}</div>
    </div>
  )
}

export default DropDown