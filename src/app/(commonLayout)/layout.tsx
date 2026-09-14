
import Navigation from "@/components/modules/navbar/navbar";
import { Footer } from "@/components/ui/footer";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <Navigation />
      <div className=" lg:pb-16 pb-24 overflow-hidden">{children}</div>
      <Footer />
    </section>
  );
}
