import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { calendarAtomFamily } from "@atoms/calendarAtom";
import { Todo, typeAtom } from "@atoms/todoAtom";
import { modalAtom } from "@atoms/stateAtom";

import { CONSTANT_STR } from "@utils/constant";
import { setArrayToPath } from "@utils/datepiacker";

import { useChangeTodoState, useDeleteTodo, useGetTodos } from "@api/todo";

import { ListContent, ListLayout, ListTitle } from "@components/list";

import EmptyContainer from "./EmptyContainer";
import ListItemContainer from "./ListItemContainer";
import CardContainer from "./CardContainer";

import { ErrorContainer } from "@containers/common";

const ListContainer = () => {
  const navigate = useNavigate();

  const [modal, setModal] = useRecoilState(modalAtom);
  const resetModal = useResetRecoilState(modalAtom);

  const type = useRecoilValue(typeAtom);
  const selectedDate = useRecoilValue(calendarAtomFamily("todoList"));

  const { data, isError, isSuccess, refetch } = useGetTodos(
    setArrayToPath([selectedDate.year, selectedDate.month, selectedDate.day])
  );

  const { mutate: changeStateMutate } = useChangeTodoState(() => {
    resetModal();
  });
  const { mutate: deleteMutate } = useDeleteTodo(() => {
    resetModal();
  });

  const [store, setStore] = useState<Todo[]>([]);
  const [curItem, setCurItem] = useState<Todo>();

  const list = (() => {
    if (type === "todo") {
      return store.filter(({ is_completed }) => !is_completed).filter(({ is_held }) => !is_held);
    } else if (type === "complete") {
      return store.filter(({ is_completed }) => is_completed);
    } else if (type === "hold") {
      return store.filter(({ is_held }) => is_held);
    } else return [];
  })();

  const handleClickItem = (item: Todo) => {
    setModal({ isOpened: true, type: "card" });
    setCurItem(item);
  };

  const handleClickAdd = () => navigate("add");

  const handleClickEdit = (id: string) =>
    navigate(`edit/${setArrayToPath([selectedDate.year, selectedDate.month, selectedDate.day])}/${id}`);

  const handleChangeState = (id: string, type: "todo" | "hold" | "complete", val: boolean) => {
    changeStateMutate({ id, type, val });
  };

  const handleClickDelete = (id: string) => deleteMutate(id);

  useEffect(() => {
    if (data) {
      setStore(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [selectedDate]);

  return (
    <ListLayout>
      {isError && <ErrorContainer refetch={refetch}></ErrorContainer>}
      {isSuccess &&
        (list.length !== 0 ? (
          <>
            <ListTitle type={type}>
              <span
                css={{
                  fontSize: "12px",
                  fontWeight: 400,
                }}
              >
                {CONSTANT_STR[type].title} 총 {list.length}건
              </span>
            </ListTitle>
            <ListContent>
              {list.map((item) => (
                <ListItemContainer
                  key={item.id}
                  item={item}
                  handleClickItem={handleClickItem}
                  handleClickEdit={handleClickEdit}
                  handleClickDelete={handleClickDelete}
                  handleChangeState={handleChangeState}
                ></ListItemContainer>
              ))}
            </ListContent>
            {modal.isOpened &&
              modal.type === "card" &&
              createPortal(
                <CardContainer
                  item={curItem}
                  type={type}
                  handleClickEdit={handleClickEdit}
                  handleClickDelete={handleClickDelete}
                  handleChangeState={handleChangeState}
                ></CardContainer>,
                document.body,
                "todo_card"
              )}
          </>
        ) : (
          <EmptyContainer type={type} handleClickAdd={handleClickAdd}></EmptyContainer>
        ))}
    </ListLayout>
  );
};

export default ListContainer;
