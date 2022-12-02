import React from "react";
import classNames from "classnames";
import "components/InterviewerListItem.scss";


export default function InterviewerListItem(props) {

  const interviewerList = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  const profileName = (name) => {
    if (props.selected === true) {
      return name;
    }
    return;
  };

  return (
    <li onClick={() => props.setInterviewer(props.id)} className={interviewerList}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {profileName(props.name)}
    </li>
  );
}