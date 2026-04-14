import DashboardClient from "./DashboardClient";

export const metadata = {
  title: "NeuroLens | Doctor Dashboard",
  description: "AI-powered EEG seizure analysis portal.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
