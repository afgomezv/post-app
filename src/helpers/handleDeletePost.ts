import axios from "axios";
import Swal from "sweetalert2";

export const handleDeletePost = async (postId: string) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Se ha eliminado la publicación",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error al eliminar la publicación", error);
    // Manejar el error de manera apropiada (mostrar un mensaje de error, registrar en algún lugar, etc.).
  }
};
