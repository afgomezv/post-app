"use client";

//* React
import { FC, useEffect, useState } from "react";

//*Next
import Link from "next/link";

//*NextUI
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";

//*React-Hook-Form - Axios
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

//*Interface
import { User, Post } from "@/interface";

//*Iconos
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Loading } from "./Loading";

interface Props {
  authors: User[];
  params: { id: String };
}

const NewPost: FC<Props> = ({ authors, params }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [postForm, setPostForm] = useState({
    title: "",
    body: "",
    authorId: "",
  });

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Post>();

  useEffect(() => {
    if (params.id) {
      axios.get(`/api/posts/${params.id}`).then((res) => {
        const post = res.data;
        setValue("title", post.title);
        setValue("body", post.body);
        setValue("userId", post.authorId);
      });
    }
  }, [params.id, setValue]);

  const onSubmit: SubmitHandler<Post> = async (data) => {
    if (params.id) {
      try {
        await axios.put(`/api/posts/${params.id}`, data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha actualizado la publicación",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await axios.post("/api/posts", data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Se ha guardado la publicación",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        console.error(error);
      }
    }
    router.refresh();
    router.push("/");
  };

  return (
    <>
      {isLoading && <Loading />}
      <div>
        <section className="container mx-auto mt-20 bg-white border border-gray-200 rounded-xl">
          <h2 className="px-4 py-4 text-gray-500 text-lg font-medium">
            {params.id ? "Editar " : "Guardar "} publicación
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 px-4 pt-6 pb-8">
              {/*Título */}
              <Input
                title="text"
                label="Título *"
                variant="bordered"
                color={!errors.title ? "primary" : "danger"}
                isInvalid={!errors.title ? false : true}
                errorMessage={!errors.title ? "" : `${errors.title?.message}`}
                {...register("title", {
                  required: {
                    value: true,
                    message: "El titulo es requerido.",
                  },
                })}
              />
              {/*Autor*/}
              <Select
                label="Autor *"
                variant="bordered"
                color={!errors.userId ? "primary" : "danger"}
                isInvalid={!errors.userId ? false : true}
                errorMessage={!errors.userId ? "" : `${errors.userId?.message}`}
                {...register("userId", {
                  required: {
                    value: true,
                    message: "Seleccione un autor.",
                  },
                })}
              >
                {authors.map((author) => (
                  <SelectItem key={author.id} value={author.id}>
                    {author.name}
                  </SelectItem>
                ))}
              </Select>
              {/*Descripción */}
              <Textarea
                className="col-span-2"
                label="Descripción *"
                variant="bordered"
                color={!errors.body ? "primary" : "danger"}
                isInvalid={!errors.body ? false : true}
                errorMessage={!errors.body ? "" : `${errors.body?.message}`}
                {...register("body", {
                  required: {
                    value: true,
                    message: "La descripción es requerida",
                  },
                })}
              />
            </div>
            <div className="p-8 flex justify-between">
              <Button
                className="capitalize text-white"
                startContent={<FaArrowLeft />}
                color="primary"
                size="lg"
              >
                <Link href={"/"}>volver</Link>
              </Button>
              <Button
                type="submit"
                className="capitalize text-white"
                endContent={<FaSave />}
                color="primary"
                size="lg"
              >
                {params.id ? "Editar" : "Guardar"}
              </Button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default NewPost;
