import VerifyEmail from "@/components/modules/auth/verify-email";

export default async function VerifyEmailPage({searchParams} : {searchParams : Promise<{ [key: string]: string | undefined }>}) {
  const {token} = await searchParams;

  
  return <VerifyEmail token={token as string}/>;
}
