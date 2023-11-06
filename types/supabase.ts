export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      event_types: {
        Row: {
          created_at: string
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          active: boolean
          canceled: boolean
          canceled_at: string | null
          created_at: string
          date: string
          description: string
          event_type: number | null
          finished: boolean
          finished_at: string | null
          future: boolean
          guests: number
          happening: boolean
          id: string
          local: string
          name: string
          owner_id: string
          started_at: string | null
        }
        Insert: {
          active?: boolean
          canceled?: boolean
          canceled_at?: string | null
          created_at?: string
          date?: string
          description: string
          event_type?: number | null
          finished?: boolean
          finished_at?: string | null
          future?: boolean
          guests: number
          happening?: boolean
          id?: string
          local: string
          name: string
          owner_id: string
          started_at?: string | null
        }
        Update: {
          active?: boolean
          canceled?: boolean
          canceled_at?: string | null
          created_at?: string
          date?: string
          description?: string
          event_type?: number | null
          finished?: boolean
          finished_at?: string | null
          future?: boolean
          guests?: number
          happening?: boolean
          id?: string
          local?: string
          name?: string
          owner_id?: string
          started_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "events_event_type_fkey"
            columns: ["event_type"]
            isOneToOne: false
            referencedRelation: "event_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      service_availability: {
        Row: {
          created_at: string
          end_time: string
          id: string
          service_id: string
          start_time: string
        }
        Insert: {
          created_at?: string
          end_time: string
          id?: string
          service_id: string
          start_time: string
        }
        Update: {
          created_at?: string
          end_time?: string
          id?: string
          service_id?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "service_availability_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          }
        ]
      }
      service_types: {
        Row: {
          created_at: string
          id: number
          type: string
        }
        Insert: {
          created_at?: string
          id?: number
          type: string
        }
        Update: {
          created_at?: string
          id?: number
          type?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          created_at: string
          description: string
          id: string
          price: number
          provider_id: string
          provider_name: string | null
          rating: number
          service_type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          price: number
          provider_id: string
          provider_name?: string | null
          rating: number
          service_type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          price?: number
          provider_id?: string
          provider_name?: string | null
          rating?: number
          service_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "services_provider_id_fkey"
            columns: ["provider_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "services_service_type_fkey"
            columns: ["service_type"]
            isOneToOne: false
            referencedRelation: "service_types"
            referencedColumns: ["type"]
          }
        ]
      }
      users: {
        Row: {
          account_type: string
          address: string | null
          created_at: string
          email: string
          id: string
          name: string | null
        }
        Insert: {
          account_type: string
          address?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
        }
        Update: {
          account_type?: string
          address?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type_enum: "provedor" | "usuario"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
