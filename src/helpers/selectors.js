export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(d => d.name === day);
  if (!findDay) {
    return [];
  }
  const dayAppointments = findDay.appointments;
  const appointmentForDay = Object.values(state.appointments).filter((appointment) => dayAppointments.includes(appointment.id));
  return appointmentForDay;
}

export function getInterview(state, interview) {
  if (!interview) return null;
  const newInterview = { ...interview, interviewer: Object.values(state.interviewers).find(intr => intr.id === interview.interviewer) };
  if (!newInterview) return null;
  return newInterview;
}
