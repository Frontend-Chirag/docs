"use client";

import { toast } from "sonner";
import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

import { getUsers, getDocuments } from "./action";
import { FullScreenLoader } from "@/components/FullScreenLoader";
import { Id } from "../../convex/_generated/dataModel";
import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from "@/contants/margins";


type User = {
  id: string;
  name: string;
  avatar: string;
}

export function Room({ children }: { children: ReactNode }) {

  const params = useParams();

  const [users, setUsers] = useState<User[]>([]);


  const fetchUsers = useMemo(() => async () => {
    try {
      const list = await getUsers();
      setUsers(list);
    } catch {
      toast.error("Failed to fetch users")
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers])


  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint={async () => {
        const endPoint = "/api/liveblocks-auth";
        const room = params.documentId as string;

        const response = await fetch(endPoint, {
          method: 'POST',
          body: JSON.stringify({ room })
        });

        return await response.json();
      }}
      
      resolveUsers={({ userIds }) => {
        return userIds.map((userId) => users.find((user) => user.id === userId ))
      }}
      resolveMentionSuggestions={({ text }) => {
        let filteredUsers = users;

        if (text) {
          filteredUsers = users.filter(
            user => user.name.toLowerCase().includes(text.toLowerCase())
          )
        };

        return filteredUsers.map((user) => user.id);
      }}
      resolveRoomsInfo={async ({ roomIds }) => {
        const documents = await getDocuments(roomIds as Id<"documents">[]);
        console.log(documents)
        return documents.map((document) => ({
          id: document.id,
          name: document.name
        }))
      }}
    >
      <RoomProvider
        id={params.documentId as string}
        initialStorage={{ leftMargin: LEFT_MARGIN_DEFAULT, rightMargin: RIGHT_MARGIN_DEFAULT }}>
        <ClientSideSuspense fallback={<FullScreenLoader label="Just a moment..." />}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};