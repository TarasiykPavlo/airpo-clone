import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://gytzmptcuxzrbmsghogk.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5dHptcHRjdXh6cmJtc2dob2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQzMTEyNDEsImV4cCI6MjAxOTg4NzI0MX0.NlBsso41kMPib9eP2or9FLiDhPPVOVnIwPW1n8kKElY";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
