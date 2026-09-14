import ProfileSection from "../../../../components/modules/(user)/dashboard/settings/profile-section";
import DangerZone from "../../../../components/modules/(user)/dashboard/settings/danger-zone";
import BillingSection from "@/components/modules/(user)/dashboard/settings/billing-section";
import { getInvoices } from "@/services/payment.services";

export default function SettingsPage() {
  const invoicesPromise = getInvoices();
  return (
    <main className=" lg:pt-24 lg:pb-20 px-12 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-16">
          <h2 className="text-5xl font-bold tracking-tight text-foreground mb-4">
            Settings
          </h2>
          <p className="text-zinc-500 max-w-xl">
            Manage your account preferences, billing information, and developer
            workspace configurations.
          </p>
        </header>

        {/* Settings Sections */}
        <div className="space-y-20">
          <ProfileSection />
          <BillingSection invoicePromise={invoicesPromise} />
          <DangerZone />
        </div>
      </div>
    </main>
  );
}
