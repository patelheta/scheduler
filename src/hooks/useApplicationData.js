import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const updateSpots = (state, appointments) => {
    let spots = 0;

    const currentDay = state.days.find(d =>
      d.name === state.day);

    currentDay.appointments.forEach(id => {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++;
      }
    });

    const day = { ...currentDay, spots };
    const days = state.days.map(d =>
      d.name === state.day ? day : d);
    return days;
  };

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      const appointment = {
        ...state.appointments[id],
        interview: { ...interview }
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(state, appointments);
      setState({ ...state, days, appointments });

    });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const appointment = {
        ...state.appointments[id],
        interview: null
      };
      const appointments = {
        ...state.appointments,
        [id]: appointment
      };

      const days = updateSpots(state, appointments);
      setState({ ...state, days, appointments });
    });
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
};
