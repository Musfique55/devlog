"use client";
import { stripeCheckoutSession } from "@/app/(commonLayout)/pricing/_action";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StripeCheckoutButton = () => {
  const router = useRouter();

  const handleCheckout = async () => {
    const res = await stripeCheckoutSession();

    if (res.success) {
      router.push(res.paymentUrl!);
    } else {
      toast.error(res.message);
    }
  };
  
  return <Button className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 font-semibold text-base h-12 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center gap-2 mb-6" onClick={handleCheckout}>Pay With Stripe</Button>;
};

export default StripeCheckoutButton;
