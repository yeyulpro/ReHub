import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Hub_Event } from "../types";
import agent from "../api/agent";
import { useNavigate } from "react-router";
import { useAccount } from "./useAccount";

export const useEvents = (id?: string) => {
  const navigate = useNavigate();
  const { currentUser } = useAccount();
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const response = await agent.get<Hub_Event[]>("events");
      return response.data;
    },
    enabled: !id && !!currentUser && location.pathname == "/events",
    select: (data) => {
      return data.map((event) => {
        const host =event.attendees.find(x=>x.id==event.hostId);
        return {
          ...event,
          isHost: currentUser?.id === event.hostId,
          isGoing: event.attendees.some((x) => x.id === currentUser!.id),
          hostImageUrl:host?.imageUrl
        };
      });
    },
  });

  const { data: event, isLoading: isLoadingEvent } = useQuery({
    queryKey: ["events", id],
    queryFn: async () => {
      const response = await agent.get<Hub_Event>(`events/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser && location.pathname == `/events/${id}`,
    select: (data) => {
       const host =data.attendees.find(x=>x.id==data.hostId);
      return {
        ...data,
        isHost: currentUser?.id === data.hostId,
        isGoing: data.attendees.some((x) => x.id === currentUser!.id),
        hostImageUrl:host?.imageUrl
      };
    },
  });

  const createEvent = useMutation({
    mutationFn: async (event: Hub_Event) => {
      const response = await agent.post<string>("events", event);
      return response.data;
    },
    onSuccess: async (newId: string) => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate(`/events/${newId}`);
    },
  });

  const updateEvent = useMutation({
    mutationFn: async (event: Hub_Event) => {
      await agent.put("events", event);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      navigate(`/events/${event?.id}`);
    },
  });

  const deleteEvent = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`events/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const updateAttendance = useMutation({
    mutationFn:async (id:string)=>{
      await agent.post(`events/${id}/attend`)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["events", id] });
    },
  })
  return {
    events,
    isLoading,
    updateEvent,
    deleteEvent,
    event,
    isLoadingEvent,
    createEvent,
    updateAttendance,
  };
};
