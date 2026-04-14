import AuthForm from "@/components/AuthForm";

export const metadata = {
  title: "Sign In | NeuroLens Authentication",
  description: "Securely sign in to your NeuroLens account.",
};

export default function LoginPage() {
  return <AuthForm defaultTab="signin" />;
}
