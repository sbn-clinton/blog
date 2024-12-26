import SignInButton from "@/components/SignInButton";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 md:max-w-3xl md:mx-auto px-5 font-sans">
      <h1 className="font-bold text-xl text-center">Sign In</h1>
      <SignInButton />
    </div>
  );
};

export default SignInPage;
