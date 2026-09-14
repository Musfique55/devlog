
import { Users } from "lucide-react";


const UsersFallback = () => {
  return (
    <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20">
          <Users className="w-8 h-8 text-purple-400" />
        </div>
        <div className="text-center space-y-2">
          <h3 className="text-lg font-bold text-zinc-100">No users found</h3>
          <p className="text-sm text-zinc-500">
            There are no users to display. Try adjusting your filters or add new
            users to get started.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersFallback;
