// =====================================================
// E-CAMPUS — SUPABASE CONFIGURATION
// =====================================================

const SUPABASE_URL = "https://ftilzhekqutqmdjiewbg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_lQdzEhuU_LlME7vXSWNskA_-Ga7D-fw";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
