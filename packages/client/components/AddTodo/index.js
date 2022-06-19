import styles from "./AddTodo.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDialog } from "muibox";
import isEmpty from "lodash.isempty";
import { useTodoInputs } from "@/Hooks/useTodoInputs";
import { addTodo } from "@/redux/todos/todoSlices";
import { uuidv4 } from "@/utils/helper";
import {
  Select,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  TextField,
  Grid,
} from "@mui/material";

const AddTodo = () => {
  const dispatch = useDispatch();

  const { loading, priorities } = useSelector((state) => state.todos);
  const dialog = useDialog();

  const initForm = {
    id: uuidv4(),
    name: "",
    priority: {},
  };
  const [inputs, setInputs] = useTodoInputs(initForm, priorities);

  const handleSubmit = (e) => {
    setInputs({ ...inputs, id: uuidv4() });

    const { name, priority } = inputs;
    if (isEmpty(name) || isEmpty(priority))
      dialog.alert({ title: "Warning", message: "All Fields required" });
    else {
      dispatch(addTodo(inputs));

      setTimeout(() => {
        setInputs({ ...initForm });
      }, 3000);
    }

    e.preventDefault();
  };

  return (
    <div className={styles.addtodo}>
      <h2>Task Form</h2>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              fullWidth
              id="standard-basic"
              size="small"
              label="Standard"
              variant="outlined"
              name="name"
              value={inputs.name}
              onChange={setInputs}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Choose</InputLabel>
              <Select
                name="priority"
                label="Priority"
                labelId="priority-label"
                id="priority-label"
                size="small"
                variant="outlined"
                defaultValue={inputs.priority?.score || ""}
                value={inputs.priority?.score || ""}
                onChange={setInputs}
              >
                <MenuItem disabled value="">
                  <em>Choose</em>
                </MenuItem>
                {priorities?.length > 0 &&
                  !loading &&
                  priorities?.map(({ score, title }, index) => (
                    <MenuItem value={score} key={index}>
                      {title}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" type="submit" disableElevation>
              SAVE
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddTodo;
