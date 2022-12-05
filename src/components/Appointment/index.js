import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import Form from "./Form";
import Confirm from "./Confirm";
import useVisualMode from "../../hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

export default function Appointment(props) {
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(props.id, interview).then((resp) => {
      transition(SHOW);
    });
    transition(SAVING);
  };

  const deleteSlot = () => {
    transition(CONFIRM);
  };

  const onDeleteConfirm = () => {
    props.cancelInterview(props.id).then((resp) => {
      transition(EMPTY);
    });
    transition(DELETING);
  };

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === CONFIRM && <Confirm
        message="Delete the appointment?"
        onConfirm={onDeleteConfirm}
        onCancel={() => back()} />}

      {mode === DELETING && <Status
        message="Deleting"
      />}


      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SAVING && <Status
        message="Saving"
      />}

      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}

          onDelete={deleteSlot}
        />
      )}

      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onSave={save}
        onCancel={() => back()}
      />}
    </article>
  );
};