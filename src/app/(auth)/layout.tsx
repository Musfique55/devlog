
import Navigation from "@/components/modules/navbar/navbar";
import { Footer } from "@/components/ui/footer";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section>
      <Navigation />
        {children}
      <Footer />
    </section>
  );
};

export default AuthLayout;
