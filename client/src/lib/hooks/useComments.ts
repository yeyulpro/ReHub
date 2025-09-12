import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
} from "@microsoft/signalr";

import { useLocalObservable } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { ChatComment } from "../types";
import { runInAction } from "mobx";

export const useComments = (eventId?: string) => {
  const created = useRef(false);
  const commentStore = useLocalObservable(() => ({
    comments: [] as ChatComment[],
    hubConnection: null as HubConnection | null,
    createHubConnection(eventId: string) {
      if (!eventId) return;
      this.hubConnection = new HubConnectionBuilder()
        .withUrl(`${import.meta.env.VITE_COMMENTS_URL}?eventId=${eventId}`, {
          withCredentials: true,
        })
        .withAutomaticReconnect()
        .build();
      this.hubConnection
        .start()
        .catch((error) =>
          console.log("error establishing connection: ", error)
        );
      this.hubConnection.on("LoadComments", (comments) => {
        runInAction(() => {
          this.comments = comments;
        });
      });
      this.hubConnection.on("ReceiveComment", (comment) => {
        runInAction(() => {
          this.comments.unshift(comment);
        });
      });
    },
    stopHubConnection() {
      if (this.hubConnection?.state === HubConnectionState.Connected) {
        this.hubConnection
          .stop()
          .catch((error) => console.log("Error stopping connection : ", error));
      }
    },
  }));

  useEffect(() => {
    if (eventId && !created.current) {
      commentStore.createHubConnection(eventId);
      created.current = true;
    }
    return () => {
      commentStore.stopHubConnection();
      commentStore.comments = [];
    };
  }, [eventId, commentStore]);
  return {
    commentStore,
  };
};
