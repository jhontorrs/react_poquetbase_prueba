import { Persona } from "../models/persona";
import { PB } from "./connection";

export const getAllPersonas = async () => {
  const records = await PB.collection<Persona>("personas").getFullList({});

  return records;
};

export const crearPersona = async (data: {
  nombre: string;
  direccion: string;
}) => {
  const record = await PB.collection("personas").create<Persona>(data);
  return record;
};
