import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <SignIn path="/SignIn" afterSignInUrl="/Todos"/>
  );

export default SignInPage;