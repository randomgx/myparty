import { supabase } from "../lib/supabase";
import { Event, ServiceType, Service, User } from "../types/collections";

export const getEvents = async () => {
  const { data, error } = await supabase.from("events").select("*");
  if (error) {
    throw error;
  }
  return (data as Event[]) ?? [];
};

export const getEvent = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as Event;
};

export const createEvent = async (event: Event) => {
  const { data, error } = await supabase.from("events").insert([event]);
  if (error) {
    throw error;
  }
  return data;
};

export const updateEvent = async (event: Event) => {
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", event.id)
    .select("*");
  if (error) {
    throw error;
  }
  return data as Event[];
};

export const deleteEvent = async (id: string) => {
  const { data, error } = await supabase
    .from("events")
    .update({ canceled: true, canceled_at: new Date() })
    .eq("id", id)
    .select("*");
  if (error) {
    throw error;
  }
  return data as Event[];
};

export const getEventTypes = async () => {
  const { data, error } = await supabase.from("event_types").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getProviderServices = async () => {
  const { data, error } = await supabase.from("services").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const getServiceTypes = async () => {
  const { data, error } = await supabase.from("service_types").select("*");
  if (error) {
    throw error;
  }
  return data as ServiceType[];
};

export const getServiceType = async (id: string) => {
  const { data, error } = await supabase
    .from("service_types")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as ServiceType;
};

export const getServicesByType = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("service_type", id);
  if (error) {
    throw error;
  }
  return data as Service[];
};

export const getService = async (id: string) => {
  const { data, error } = await supabase
    .from("services")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as Service;
};

export const getProviderDetails = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("name, id")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  return data as Partial<User>;
};
