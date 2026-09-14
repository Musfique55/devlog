import LoginForm from "@/components/modules/auth/LoginForm";




const LoginPage = async ({searchParams} : {searchParams: Promise<{redirect?: string}>}) => {
  const {redirect} = await searchParams;
  return (
    <LoginForm intendedUrl={redirect} />
  )
};

export default LoginPage;



