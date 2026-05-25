import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_center,rgba(108,99,255,0.16),transparent_55%)]">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(123,130,160,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(123,130,160,0.06)_1px,transparent_1px)] bg-[size:36px_36px]" />
      <LoginForm />
    </div>
  );
}