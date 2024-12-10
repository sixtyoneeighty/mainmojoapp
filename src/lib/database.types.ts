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
      profiles: {
        Row: {
          id: string
          name: string
          age: number | null
          gender: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          age?: number | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          age?: number | null
          gender?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      medical_images: {
        Row: {
          id: string
          user_id: string
          image_url: string
          image_type: string
          body_area: string
          comments: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          image_url: string
          image_type: string
          body_area: string
          comments?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          image_url?: string
          image_type?: string
          body_area?: string
          comments?: string | null
          created_at?: string
        }
      }
      analysis_results: {
        Row: {
          id: string
          image_id: string
          confidence_score: number
          findings: Json
          recommendations: string | null
          created_at: string
        }
        Insert: {
          id?: string
          image_id: string
          confidence_score: number
          findings: Json
          recommendations?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          image_id?: string
          confidence_score?: number
          findings?: Json
          recommendations?: string | null
          created_at?: string
        }
      }
    }
  }
}
