import 'dotenv/config';
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nravoicndsgzdcthsyte.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;


if (supabaseKey === undefined) {
  throw new Error("Missing env variable: SUPABASE_KEY");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
