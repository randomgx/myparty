import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventType = Database["public"]["Tables"]["event_types"]["Row"];
export type User = Database["public"]["Tables"]["users"]["Row"];
export type Service = Database["public"]["Tables"]["services"]["Row"];
export type ServiceType = Database["public"]["Tables"]["service_types"]["Row"];
