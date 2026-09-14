import WorkspaceStatCard from "@/components/modules/(super-admin)/workspace/stat-card";
import WorkspaceTable from "@/components/modules/(super-admin)/workspace/workspace-table";
import { Shield, TrendingUp, Zap, House} from "lucide-react";
import { Suspense } from "react";


const WorkspacesPage = () => {
  return (
    <div>
      <section className=" py-12">
        <div className="flex justify-between items-end mb-12">
          <div>
            <nav className="flex gap-2 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
              <span>Admin</span>
              <span>/</span>
              <span className="text-purple-400">Workspace Management</span>
            </nav>
            <h2 className="text-5xl font-black tracking-tighter mb-2">
              Global Registry
            </h2>
            <p className="text-slate-400 font-medium max-w-xl">
              Centralized monitoring of all development environments across the
              Architect infrastructure.
            </p>
          </div>
          
        </div>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 ">
          <WorkspaceStatCard
            label="Total Nodes"
            value="1,284"
            subtext="+12% from last month"
            icon={<House className="w-5 h-5" />}
          />
          <WorkspaceStatCard
            label="Active Threads"
            value="42,902"
            subtext="Stable deployment pulse"
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <WorkspaceStatCard
            label="Enterprise Clusters"
            value="186"
            subtext="High-priority SLAs"
            icon={<Zap className="w-5 h-5" />}
          />
          <WorkspaceStatCard
            label="System Integrity"
            value="99.98%"
            subtext="Uptime (Last 24h)"
            icon={<Shield className="w-5 h-5" />}
            variant="featured"
          />
        </section>
      </section>
      <Suspense>
        <WorkspaceTable />
      </Suspense>
    </div>
  );
};

export default WorkspacesPage;
