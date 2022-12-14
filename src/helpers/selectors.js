/**
 * return appointments for specific day
 * @param state 
 * @param day 
 * @returns appointmentForDay
 */
export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(d => d.name === day);
  if (!findDay) {
    return [];
  }
  const dayAppointments = findDay.appointments;
  const appointmentForDay = Object.values(state.appointments).filter((appointment) => dayAppointments.includes(appointment.id));
  return appointmentForDay;
}

/**
 * return Interviewers for specific day
 * @param state 
 * @param day 
 * @returns appointmentForDay
 */

export function getInterviewersForDay(state, day) {
  const findDay = state.days.find(d => d.name === day);
  if (!findDay) {
    return [];
  }
  const dayInterviewers = findDay.interviewers;
  const interviewersForDay = Object.values(state.interviewers).filter((interviewer) => dayInterviewers.includes(interviewer.id));
  return interviewersForDay;
}

/**
 * Return new Interview object for specific appointment with interviewers details
 * @param state 
 * @param interview 
 * @returns new interview object
 */
export function getInterview(state, interview) {
  if (!interview) return null;
  const newInterview = { ...interview, interviewer: Object.values(state.interviewers).find(intr => intr.id === interview.interviewer) };
  if (!newInterview) return null;
  return newInterview;
}
