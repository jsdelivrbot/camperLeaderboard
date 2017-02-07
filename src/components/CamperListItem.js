import React from 'react';

const CamperListItem = (props) => {
  return(
    <tr>
      <td></td>
      <td><img className="profile-image" src={props.img} alt=""/> {props.username}</td>
      <td>{props.recent}</td>
      <td>{props.alltime}</td>
    </tr>
  );
};



export default CamperListItem;