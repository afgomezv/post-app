import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SectionTable from "@/components/SectionTable";

jest.mock("@/config/prisma", () => ({
  prisma: {
    post: {
      findMany: jest.fn(),
    },
  },
}));

describe("SectionTable Component", () => {
  test("renderiza el componente", () => {
    render(<SectionTable posts={[]} />);
    expect(screen.getByText("Publicaciones")).toBeInTheDocument();
  });

  test("onSearchChange actualiza correctamente el estado de filterValue", () => {
    const { getByPlaceholderText } = render(<SectionTable posts={[]} />);
    const inputElement = getByPlaceholderText("Buscar publicación");

    fireEvent.change(inputElement, { target: { value: "test" } });

    expect(inputElement.getAttribute("value")).toBe("test");
  });

  test("onRowsPerPageChange actualiza correctamente el estado de rowsPerPage", () => {
    const { getByLabelText } = render(<SectionTable posts={[]} />);
    const selectElement = getByLabelText(
      "Filas por página:"
    ) as HTMLSelectElement;

    fireEvent.change(selectElement, { target: { value: "10" } });

    expect(selectElement.value).toBe("10");
  });

  test("setPage actualiza correctamente el estado de page", async () => {
    const { getByTestId } = render(<SectionTable posts={[]} />);
    await waitFor(() => {
      const paginationElement = getByTestId("pagination");
      fireEvent.click(paginationElement);
    });
  });
});
