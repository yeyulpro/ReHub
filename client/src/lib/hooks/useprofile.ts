import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Photo, Profile, User } from "../types";
import agent from "../api/agent";
import { useMemo } from "react";
import { EditProfileSchema } from "../schema/EditProfileSchema";

export const useProfile = (id?: string) => {
  const queryClient = useQueryClient();

  const { data: profile, isLoading: loadingProfile } = useQuery<Profile>({
    queryKey: ["profile", id],
    queryFn: async () => {
      const response = await agent.get(`/profiles/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const { data: photos, isLoading: loadingPhotos } = useQuery<Photo[]>({
    queryKey: ["photos", id],
    queryFn: async () => {
      const response = await agent.get(`/profiles/${id}/photos`);
      return response.data;
    },
    enabled: !!id,
  });

  const updateProfile = useMutation({
    mutationFn: async (profile: EditProfileSchema) => {
      await agent.put('/profiles', profile);
    },
    onSuccess: (_, profile) => {
      queryClient.setQueryData(['profile', id], (data: Profile) => {
        if (!data) return data;
        return {
          ...data,
          displayName: profile.displayName,
          bio: profile.bio
        }
      });
      queryClient.setQueryData(['user'], (userData: User) => {
        if (!userData) return userData;
        return {
          ...userData,
          displayName: profile.displayName
        }
      });
    }
  })

  const setMainPhoto = useMutation({
    mutationFn: async (photo: Photo) => {
      await agent.put(`/profiles/${photo.id}/setMainPhoto`);
    },
    onSuccess: (_, photo) => {
      queryClient.setQueryData(["user"], (userData: User) => {
        if (!userData) return userData;
        return {
          ...userData,
          imageUrl: photo.url,
        };
      });
      queryClient.setQueryData(["profile", id], (profile: Profile) => {
        if (!profile) return profile;
        return {
          ...profile,
          imageUrl: photo.url,
        };
      });
    },
  });

  const deletePhoto = useMutation({
    mutationFn: async (photoId: string) => {
      await agent.delete(`/profiles/${photoId}/photos`);
    },
    onSuccess: (_, photoId) => {
      queryClient.setQueryData(["photos", id], (photos: Photo[]) => {
        return photos?.filter((x) => x.id !== photoId);
      });
    },
  });



  const isCurrentUser = useMemo(() => {
    return id === queryClient.getQueryData<User>(["user"])?.id;
  }, [id, queryClient]);

  const uploadPhoto = useMutation({
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await agent.post<Photo>(
        "/profiles/add-photo",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      return response.data;
    },
    onSuccess: async (photo: Photo) => {
      await queryClient.invalidateQueries({ queryKey: ["photos", id] });
      queryClient.setQueryData(["user"], (data: User) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
      queryClient.setQueryData(["profile", id], (data: Profile) => {
        if (!data) return data;
        return {
          ...data,
          imageUrl: data.imageUrl ?? photo.url,
        };
      });
    },
  });

  return {
    profile,
    loadingProfile,
    photos,
    loadingPhotos,
    isCurrentUser,
    uploadPhoto,
    setMainPhoto,
    deletePhoto,
    updateProfile
  };
};
