import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { crearPersona, getAllPersonas } from "./services/personas";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

type PersonaFrom = {
  nombre: string;
  direccion: string;
};
const personaYup = yup.object({
  nombre: yup.string().required("mete dato"),
  direccion: yup.string().required("aca tambien"),
});

export const App = () => {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonaFrom>({
    resolver: yupResolver(personaYup),
  });

  const { data } = useQuery({
    queryKey: ["personas"],
    queryFn: getAllPersonas,
  });
  const { mutate } = useMutation({
    mutationFn: crearPersona,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personas"] });
    },
  });

  const gaurdarHandle = handleSubmit(async (data) => {
    mutate(data);
  });

  return (
    <div>
      <ul>
        {(data ?? []).map((itm) => {
          return (
            <li key={itm.id} className="px-4">
              {itm.nombre}
              <span className="pl-2 text-xs font-extralight">
                {itm.direccion}
              </span>
            </li>
          );
        })}
      </ul>
      <form
        className="px-2 py-5 w-[400px] border shadow-md"
        onSubmit={gaurdarHandle}
      >
        <div className="flex gap-2">
          <label>Nombre</label>
          <input type="text" {...register("nombre")} />
          {errors.nombre && (
            <span className="text-rose-500 text-xs">
              {errors.nombre.message}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <label>Direccion</label>
          <input type="text" {...register("direccion")} />
          {errors.direccion && (
            <span className="text-rose-500 text-xs">
              {errors.direccion?.message}
            </span>
          )}
        </div>
        <button className="bg-green-600 px-2 py-1 rounded-md text-white">
          Guardar
        </button>
      </form>
      <div className="ring-offset-blue-950">p1</div>
    </div>
  );
};
