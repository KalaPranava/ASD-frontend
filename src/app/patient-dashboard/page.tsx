import PatientDashboardClient from "../../components/patient-dashboard/PatientDashboardClient";

export const metadata = {
  title: "Patient Dashboard - NeuroLens",
  description: "NeuroLens patient overview and monitoring platform.",
};

export default function PatientDashboardPage() {
  return <PatientDashboardClient />;
}
