import { PlanCard } from "@/components/modules/pricing/plan-card";
import { SummaryCard } from "@/components/modules/pricing/summary-card";


const PricingPage = () => {
    return (
        <div className="px-5 lg:px-0 mt-24 flex flex-col lg:flex-row gap-5 justify-between max-w-7xl mx-auto">
            <PlanCard />
            <SummaryCard />
        </div>
    );
};

export default PricingPage;