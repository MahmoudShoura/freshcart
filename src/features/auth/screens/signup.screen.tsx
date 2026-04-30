import SignupForm from "../components/signup/SignupForm";
import SignupHero from "../components/signup/SignupHero";

export default function SignupScreen() {
  return (
    <>
      <main className="py-10">
        <div className=" container max-w-6xl mx-auto           
        grid grid-cols-1 lg:grid-cols-2  lg:gap-10 p-4">
          <SignupHero />
          <SignupForm />
        </div>
      </main>
    </>
  );
}
