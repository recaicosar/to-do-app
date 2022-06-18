import { useState } from "react";
import { delTodo, updateTodo, multiDelTodo } from "@/redux/todos/todoSlices";
import { useSelector, useDispatch } from "react-redux";
import { useDialog } from "muibox";
import { Table } from "@/components/ui/Table";
import { EditModal } from "./EditModal";
const TodoList = () => {
  const dispatch = useDispatch();
  const { loading, items, priorities, filters } = useSelector(
    (state) => state.todos
  );

  const [editItem, setEditItem] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const dialog = useDialog();

  return (
    !loading && (
      <>
        <Table
          items={items}
          filters={filters}
          columns={["Name", "Status"]}
          onEdit={(e) => {
            setEditItem(e);
            setEditOpen(true);
          }}
          onDelete={(e) =>
            dialog.confirm("Are you sure?").then(() => dispatch(delTodo(e))).catch(() => {})
          }
          onMultiDelete={(e) => dispatch(multiDelTodo(e))}
        />
        <EditModal
          item={editItem}
          open={editOpen}
          handleClose={() => setEditOpen(false)}
          onUpdate={(e) => dispatch(updateTodo(e))}
          priorities={priorities}
        />
      </>
    )
  );
};

export default TodoList;
