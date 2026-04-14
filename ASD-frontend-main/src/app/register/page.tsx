import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Register | NeuroLens Authentication",
  description: "Create your secure NeuroLens account.",
};

export default function RegisterPage() {
  return <AuthForm defaultTab="register" />;
}
