export function getAppointmentsForDay(state, day) {
  const findDay = state.days.find(d => d.name === day);
  if (!findDay) {
    return [];
  }
  const dayAppointments = findDay.appointments;
  const appointmentForDay = Object.values(state.appointments).filter((appointment) => dayAppointments.includes(appointment.id));
  return appointmentForDay;
}
