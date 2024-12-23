import SignInButton from "@/components/SignInButton";

const SignInPage = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-10 max-w-3xl mx-auto px-5">
      <h1 className="font-bold text-xl text-center">SignInPage</h1>
      <SignInButton />
    </div>
  );
};

export default SignInPage;
