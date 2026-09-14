
import { Button } from "./button";
import Link from "next/link";

const Upgrade = () => {
  return (
    <div className=" inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl max-w-md w-full p-8 shadow-2xl">
        {/* Content */}
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Subscription</h2>
            {/* <p className="text-sm text-zinc-400">{message}</p> */}
          </div>

          {/* Upgrade Icon */}
          {/* <div className="flex justify-center py-6">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
              <span className="text-3xl">✨</span>
            </div>
          </div> */}
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-8">
          <Link href={"/upgrade"} className="flex-1">
            <Button className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold cursor-pointer">
              Upgrade Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Upgrade;
