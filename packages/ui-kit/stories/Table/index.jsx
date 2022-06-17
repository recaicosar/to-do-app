import PropTypes from "prop-types";

import styles from "./Table.module.scss";

export const Table = ({
  items,
  columns,
  onEdit,
  onDelete,
  onMultiDelete,
  ...props
}) => {
  let selectedChecked = [];
  const handleCheck = (e) => {
    const { value, checked } = e.target;

    if (checked) selectedChecked.push(parseInt(value));
    else selectedChecked = selectedChecked.filter((i) => i !== parseInt(value));
  };

  return (
    <table className={styles.table} {...props}>
      <thead>
        <tr>
          <th className="t-small">
            <button onClick={() => onMultiDelete({ ids: selectedChecked })}>
              delete
            </button>
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
        {items.map(({ name, status, id }, index) => (
          <tr key={index}>
            <td>
              <label>
                <input
                  type="checkbox"
                  value={id}
                  onChange={(e) => handleCheck(e)}
                />
              </label>
            </td>
            <td>{name}</td>
            <td className="t-active">{status}</td>
            <td>
              <button onClick={() => onEdit({ id })}>edit</button>
              <button onClick={() => onDelete({ id })}>delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  items: PropTypes.array,
  columns: PropTypes.array,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onMultiDelete: PropTypes.func,
};

Table.defaultProps = {
  items: [
    { name: "test", status: "active" },
    { name: "test2", status: "active" },
  ],
  columns: ["name", "status"],
  onEdit: () => {},
  onDelete: () => {},
  onMultiDelete: () => {},
};
