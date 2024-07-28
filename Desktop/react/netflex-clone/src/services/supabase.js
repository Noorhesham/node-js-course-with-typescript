import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://qeosgcqmnfcjzlhurqla.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlb3NnY3FtbmZjanpsaHVycWxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQ3OTQyMTcsImV4cCI6MjAyMDM3MDIxN30.MaNURRWi-6PX3R9-mnoNjpOIHdXhI6PstSbBklmW-qQ";
// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
