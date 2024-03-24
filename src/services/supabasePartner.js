import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdbjlxmtuepluhgtxhlk.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNkYmpseG10dWVwbHVoZ3R4aGxrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU5MTYyMzUsImV4cCI6MjAyMTQ5MjIzNX0.IvKuP4w4XMoZm3YiPcds1beg0MmEwP45eo21sAmab68";

const supabaseP = createClient(supabaseUrl, supabaseKey);

export default supabaseP;
