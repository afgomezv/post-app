"use client";

//* React
import { ChangeEvent, Key, useCallback, useMemo, useState } from "react";

//* NextUI
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  SortDescriptor,
} from "@nextui-org/react";

//* Interface
import { Post } from "@/interface/Post";

//* Iconos
import { LuMoreVertical } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

//* Helpers
import { columnsTitles } from "@/helpers/columnsTitles";

interface Props {
  posts: Post[];
}

export const SectionTable = ({ posts }: Props) => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "age",
    direction: "ascending",
  });

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredPosts = [...posts];

    if (hasSearchFilter) {
      filteredPosts = filteredPosts.filter((post: Post) =>
        post.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    return filteredPosts;
  }, [posts, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: IPost, b: Post) => {
      const first = a[sortDescriptor.column as keyof IPost] as number;
      const second = b[sortDescriptor.column as keyof IPost] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  //*Renderizacion de la tabla
  type IPost = (typeof posts)[0];

  const renderCell = useCallback((posts: IPost, columnKey: Key) => {
    const cellValue = posts[columnKey as keyof IPost];

    switch (columnKey) {
      case "id":
        return <p className="text-center">{posts.id}</p>;
      case "title":
        return <p className="text-center">{posts.title}</p>;
      case "body":
        return <p className="text-center">{posts.body}</p>;
      case "authorId":
        return <p className="text-center">{posts.authorId}</p>;
      case "acciones":
        return (
          <div className="relative flex justify-center items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  size="sm"
                  variant="light"
                  className="text-center"
                >
                  <LuMoreVertical className="h-6 w-8 text-default-500" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="menu-route">
                <DropdownItem
                //href={`/hiring/registers/add/${data.id}`}
                >
                  Editar
                </DropdownItem>
                <DropdownItem
                //href={`/hiring/registers/documents/${data.contractaciones.length}`}
                >
                  Eliminar
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<FiSearch />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" endContent={<GoPlus />}>
              Nuevo Post
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {posts.length} publicaciones
          </span>
          <label className="flex items-center text-default-400 text-small">
            Filas por página:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="15">25</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, posts.length, onRowsPerPageChange, onClear]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {/* Otros elementos */}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <section className="container mx-auto flex flex-col">
      <div>
        <h2 className="px-4 py-4 text-gray-500 text-lg font-medium">
          Filtros de búsqueda
        </h2>
        <section>
          <Table
            aria-label="posts"
            isHeaderSticky
            bottomContent={bottomContent}
            topContent={topContent}
            sortDescriptor={sortDescriptor}
          >
            <TableHeader columns={columnsTitles}>
              {columnsTitles.map((column) => (
                <TableColumn
                  key={column.key}
                  className="text-sm text-black text-center uppercase"
                >
                  {column.label}
                </TableColumn>
              ))}
            </TableHeader>
            <TableBody emptyContent={"No hay publicaciones"} items={posts}>
              {sortedItems.map((post) => (
                <TableRow key={post.id}>
                  {columnsTitles.map((column) => (
                    <TableCell key={column.key} className="h-20 border-b-2">
                      {renderCell(post, column.key)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      </div>
    </section>
  );
};
