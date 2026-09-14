import VerifyEmailNotice from "@/components/modules/auth/verify-email-notice";
import { jwtUtils } from "@/lib/jwtUtils";
import { cookies } from "next/headers";

const VerifyEmailNoticePage = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get("accessToken")?.value;
  const email = accessToken && jwtUtils.decodedToken(accessToken).email;

  

  return <VerifyEmailNotice email={email} />;
};

export default VerifyEmailNoticePage;
