type PagedList<T,TCursor>={
  items:T[],
  nextCursor:TCursor


}





export type Hub_Event = {
  id: string;
  title: string;
  date: Date;
  description: string;
  category: string;
  isCancelled?: boolean;
  city?: string;
  venue: string;
  latitude: number;
  longitude: number;
  attendees: Profile[];
  isGoing: boolean;
  isHost: boolean;
  hostId: string;
  hostDisplayName: string;
  hostImageUrl?:string;
};

export type Profile = {
  id: string;
  displayName: string;
  bio?: string;
  imageUrl?: string;
  following?: boolean;
  followersCount?:number;
  followingsCount?:number;
};

export type Photo={
  id:string;
  url:string;
}

export type User = {
  id: string;
  email: string;
  displayName: string;
  imageUrl?: string;
};

export type ChatComment ={
  id:string;
  createdAt:Date;
  body:string;
  userId:string;
  displayName:string;
  imageUrl?:string
}

export type LocationIQSuggestion = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: string[];
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: LocationlQAddress;
};
export type LocationIQAddress = {
  name: string;
  house_number: string;
  road: string;
  neighbourhood?: string;
  suburb?: string;
  town?: string;
  village?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country: string;
  country_code: string;
};
