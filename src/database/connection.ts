import { Pool } from "pg";
import { env } from "../config/env.js";

export const pool = new Pool({
  connectionString: env.DATABASE_URL, 
  // ex: postgres://user:pass@localhost:5432/mydb
  //postgres://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO
});
