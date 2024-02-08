import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://zkkmpreclxykgmlmuzjw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpra21wcmVjbHh5a2dtbG11emp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY5MTAzMzAsImV4cCI6MjAyMjQ4NjMzMH0.5kdZgKQNAdH9HR2Hcnol9WPoKvnP6sKEGjDDGvFweLU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
