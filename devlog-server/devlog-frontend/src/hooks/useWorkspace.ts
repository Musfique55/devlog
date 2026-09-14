import { getWorkspace } from "@/services/workspace.services";
import { useQuery } from "@tanstack/react-query";


export interface Member {
    id : string;
    workspaceId : string;
    userId : string;
    role : "ADMIN" | "MEMBER";
    createdAt : string;
    updatedAt : string;
    joinedAt : string;
    deletedAt : string | null;
    user : {
        name : string;
        email : string;
        id : string;
        image : string;
        role : "USER" 
    }
}

export interface Workspace {
    id : string;
    name : string;
    createdAt : string;
    updatedAt : string;
    deletedAt : string | null;
    isDeleted : boolean;
    isActive : boolean;
    userRole : "ADMIN" | "MEMBER";
}

const useWorkspace = (id : string) => {
    return useQuery<Workspace>({
    queryKey : ['workspace',id],
    queryFn : async () => {
      const res = await getWorkspace(id);
      return res.data;
    },
    staleTime : Infinity,// 5min
    retry : false
  })
};

export default useWorkspace;