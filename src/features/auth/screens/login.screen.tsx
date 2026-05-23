import LoginHero from "@/features/auth/components/login/loginHero";
import LoginForm from "@/features/auth/components/login/loginForm";

export default function LoginScreen() {
  return (
    <main>
      <div className="container mx-auto px-4 py-8" id="login-section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <LoginHero />
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
