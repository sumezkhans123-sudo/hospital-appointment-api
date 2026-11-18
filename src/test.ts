import prisma from "./lib/prisma.js";
import {
  createPatient,
  getPatient,
  searchPatients,
  updatePatientPhone,
  deletePatient,
} from "./patients.js";
import {
  createDoctor,
  getDoctor,
  listDoctorsBySpecialty,
  deleteDoctor,
} from "./doctors.js";
import {
  bookAppointment,
  getAppointmentFull,
  getDoctorUpcomingAppointments,
  setAppointmentStatus,
  cancelAllPatientAppointments,
  deleteAppointment,
} from "./appointments.js";

async function main() {
  console.log("\n── Patients ──────────────────────────");

  const patient = await createPatient({
    name: "Test Patient",
    email: "test.patient@example.com",
    phone: "9999999999",
  });
  console.log("Created:", patient.name, patient.id);

  const found = await getPatient(patient.id);
  console.log("Found:", found.name);

  const updated = await updatePatientPhone(patient.id, "8888888888");
  console.log("Updated phone:", updated.phone);

  const results = await searchPatients("Test");
  console.log("Search results:", results.length);

  console.log("\n── Doctors ───────────────────────────");

  const doctor = await createDoctor({
    name: "Dr. Test",
    specialty: "General Medicine",
    email: "dr.test@hospital.io",
  });
  console.log("Created:", doctor.name, doctor.id);

  const foundDoctor = await getDoctor(doctor.id);
  console.log("Found doctor:", foundDoctor.name);

  const specialists = await listDoctorsBySpecialty("General");
  console.log("General Medicine doctors:", specialists.length);

  console.log("\n── Appointments ──────────────────────");

  const futureDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const appt = await bookAppointment(
    patient.id,
    doctor.id,
    futureDate,
    "Initial consultation",
  );
  console.log("Booked:", appt.id, "for", appt.patient.name);

  const full = await getAppointmentFull(appt.id);
  console.log("Full fetch:", full.patient.name, "with", full.doctor.name);

  const schedule = await getDoctorUpcomingAppointments(doctor.id);
  console.log("Doctor schedule:", schedule.length, "appointment(s)");

  const cancelled = await setAppointmentStatus(appt.id, "cancelled");
  console.log("Status updated to:", cancelled.status);

  await setAppointmentStatus(appt.id, "scheduled");
  const cancelledCount = await cancelAllPatientAppointments(patient.id);
  console.log("Cancelled appointments:", cancelledCount);

  console.log("\n── Cleanup ───────────────────────────");
  await deleteAppointment(appt.id);
  await deletePatient(patient.id);
  await deleteDoctor(doctor.id);
  console.log("Test data cleaned up.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
