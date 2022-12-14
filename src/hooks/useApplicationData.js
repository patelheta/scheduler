import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  //A function update remaining spots for specific day
  const updateSpots = (state, appointments) => {
    let spots = 0;

    const currentDay = state.days.find(d =>
      d.name === state.day); //get current day object

    currentDay.appointments.forEach(id => {
      const appointment = appointments[id];
      if (!appointment.interview) {
        spots++; //increase spots if interview object is null
      }
    });

    const day = { ...currentDay, spots }; //update current day object with spots
    const days = state.days.map(d =>
      d.name === state.day ? day : d); //update days with new day
    return days;
  };

  const setDay = day => setState({ ...state, day });
  /** get all days
   * get appointments
   * get interviewers from backend using axios get request
   */
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);
  /**
   * book interview for given appointment id
   * @param  id 
   * @param  interview 
   * @returns 
   */
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

      const days = updateSpots(state, appointments); //update spot after booking interview
      setState({ ...state, days, appointments });

    });
  }
  /**
   * cancel existing interview for given appointment id
   * @param  id 
   * @returns 
   */
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
