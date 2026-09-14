'use client';

import { Button } from '@/components/ui/button';
import { deleteAccount, logout } from '@/services/auth.services';
import { useQueryClient } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function DangerZone() {
  const [isConfirming, setIsConfirming] = useState(false);
  const router= useRouter();
  const queryClient = useQueryClient();
  const handleDelete = async () => {
    const res = await deleteAccount();
    if(!res.success) return toast.error(res.message);
    toast.success(res.message);
    await logout();
    await queryClient.invalidateQueries({
      queryKey: ["user"],
    });
    router.push('/auth/login');
    setIsConfirming(false);
  };

  return (
    <section className="relative" id="danger">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="w-full md:w-1/3">
          <h3 className="text-xl font-bold mb-2 text-red-400">Danger Zone</h3>
          <p className="text-sm text-zinc-500 leading-relaxed">
            Irreversible actions that affect your entire account history and data access.
          </p>
        </div>
        <div className="w-full md:w-2/3">
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-8">
            <h4 className="text-zinc-100 font-bold mb-2">Delete Account</h4>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Permanently remove your personal account and all associated logs, snippets, and project
              history. This action is non-reversible.
            </p>
            {!isConfirming ? (
              <Button
                onClick={() => setIsConfirming(true)}
                className="bg-red-600 hover:bg-red-700 text-white font-bold flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Workspace Account
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-red-300 font-medium">
                  Are you sure? This action cannot be undone. All your data will be permanently deleted.
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={() => setIsConfirming(false)}
                    className="border-zinc-700 text-zinc-300 hover:text-zinc-100"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Yes, Delete My Account
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
