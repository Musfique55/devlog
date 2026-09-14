import { RegisterForm } from "@/components/modules/auth/RegisterForm";

const RegisterPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ redirect?: string; token?: string; inviteToken?: string }>;
}) => {
  const params = await searchParams;
  let inviteToken = params.inviteToken || params.token;

  if (params.redirect) {
    const decodedRedirect = decodeURIComponent(params.redirect);
    const urlMatch = decodedRedirect.match(/[?&]token=([^&]+)/);
    if (urlMatch) {
      inviteToken = urlMatch[1];
    }
  }

  return <RegisterForm inviteToken={inviteToken} />;
};

export default RegisterPage;
