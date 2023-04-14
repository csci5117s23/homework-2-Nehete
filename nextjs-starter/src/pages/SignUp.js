import { SignUp } from "@clerk/nextjs";


const SignUpPage = () => (
  <SignUp path="/SignUp" afterSignUpUrl="/Todos"/>
  );

export default SignUpPage;