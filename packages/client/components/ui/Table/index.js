import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Table.module.scss";
import { IconButton } from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import { filterList } from "@/utils/helper";
import { useDialog } from "muibox";
import isEmpty from "lodash.isempty";

export const Table = ({
  items,
  filters,
  columns,
  onEdit,
  onDelete,
  onMultiDelete,
}) => {
  const [selectedChecked, setSelectedChecked] = useState([]);
  const dialog = useDialog();

  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) setSelectedChecked([...selectedChecked, value]);
    else setSelectedChecked(selectedChecked.filter((i) => i !== value));
  };

  const { name, priority } = filters;
  const noItemFoundText =
    isEmpty(name) && isEmpty(priority)
      ? "there are no records "
      : "No Record Found";

  const filtered = filterList(items, filters);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className="t-small">
            {selectedChecked?.length > 0 && (
              <IconButton
                size="small"
                onClick={() =>
                  dialog.confirm("Are you sure?").then(() => {
                    onMultiDelete({ ids: selectedChecked });
                    setSelectedChecked([]);
                  })
                }
              >
                <DeleteIcon />
              </IconButton>
            )}
          </th>
          {columns.map((item, index) => (
            <th className="t-medium" key={index}>
              {item}
            </th>
          ))}
          <th className="t-small"></th>
        </tr>
      </thead>

      <tbody>
        {filtered.length > 0 ? (
          filtered.map((item, index) => (
            <tr key={index}>
              <td>
                <label>
                  <input
                    type="checkbox"
                    value={item.id}
                    checked={selectedChecked.includes(item.id)}
                    onChange={(e) => handleCheck(e)}
                  />
                </label>
              </td>
              <td>{item.name}</td>
              <td>
                <span className={`status-${item.priority.score}`}>
                  {item.priority.title}
                </span>
              </td>
              <td>
                <IconButton size="small" onClick={() => onEdit(item)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => onDelete({ id: item.id })}
                >
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">{noItemFoundText}</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.array,
  filters: PropTypes.object,
  columns: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onMultiDelete: PropTypes.func,
};

Table.defaultProps = {
  items: [],
  filters: {},
  columns: ["name", "status"],
  onEdit: () => {},
  onDelete: () => {},
  onMultiDelete: () => {},
};
