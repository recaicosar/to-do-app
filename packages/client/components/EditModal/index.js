import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { todoFormSetter } from "@/utils/helper";

export const EditModal = ({
  open,
  item,
  handleClose,
  onUpdate,
  priorities,
}) => {
  const initForm = {
    inputs: item,
  };

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    setInputs({ ...initForm.inputs });
  }, [item]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: todoFormSetter(inputs, priorities, name, value),
    });
  };

  const handleSubmit = (e) => {
    onUpdate(inputs);
    handleClose();
    e.preventDefault();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Task Edit</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          id="name"
          disabled
          aria-readonly
          type="text"
          fullWidth
          variant="standard"
          value={inputs.name}
          name="name"
          onChange={handleChange}
        />
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel id="priority-label">Choose</InputLabel>
          <Select
            name="priority"
            label="Priority"
            labelId="priority-label"
            id="priority-label"
            size="small"
            variant="outlined"
            defaultValue={inputs?.priority?.score || ""}
            value={inputs?.priority?.score || ""}
            onChange={handleChange}
          >
            {priorities?.length > 0 &&
              priorities?.map(({ score, title }, index) => (
                <MenuItem value={score} key={index}>
                  {title}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disableElevation>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

EditModal.propTypes = {
  opened: PropTypes.bool,
  item: PropTypes.object,
  handleClose: PropTypes.func,
  onUpdate: PropTypes.func,
  priorities: PropTypes.array,
};

EditModal.defaultProps = {
  item: {},
  opened: false,
  handleClose: () => {},
  onUpdate: () => {},
  priorities: [],
};
