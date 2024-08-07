
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jouqyafmnpcxqekaikmq.supabase.co'
// const supabaseKey = process.env.SUPABASE_TODO_ANON_KEY
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvdXF5YWZtbnBjeHFla2Fpa21xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MjUyMjgsImV4cCI6MjAzODUwMTIyOH0.DwCvZfMJHB3vuafZOqAFIYrshT5_2PyljICVV34Wu3M'
const supabase = createClient(supabaseUrl, supabaseKey)


export default supabase