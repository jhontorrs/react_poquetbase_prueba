import PocketBase from "pocketbase";

export const PB = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
