import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://binaluzjbuqiinprcxqc.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpbmFsdXpqYnVxaWlucHJjeHFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE1MzU5NzksImV4cCI6MjA2NzExMTk3OX0.iethV25Jx5-9jcn5LPqZ-L1q-uRK2FbzbE9aD3NAlB4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 联系人数据类型
export interface Contact {
  id: string
  name: string
  image?: string
  status: 'Active' | 'Inactive'
  location?: string
  verified: boolean
  value: number
  join_date: string
  created_at?: string
  updated_at?: string
}

// 推荐关系数据类型
export interface Referral {
  id: string
  contact_id: string
  referrer_name: string
  referrer_image?: string
  created_at?: string
}

// 扩展联系人类型，包含推荐关系
export interface ContactWithReferral extends Contact {
  referral: {
    name: string
    image: string
  }
}