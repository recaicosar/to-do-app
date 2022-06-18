import { useState } from "react";
import styles from "./FilterBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { filterTodo } from "@/redux/todos/todoSlices";
import { todoFormSetter } from "@/utils/helper";
import {
  Select,
  FormControl,
  MenuItem,
  OutlinedInput ,
  Button,
  Grid,
} from "@mui/material";

const FilterBar = () => {
  const dispatch = useDispatch();
  const { loading, priorities, filters } = useSelector((state) => state.todos);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs({
      ...inputs,
      [name]: todoFormSetter(inputs, priorities, name, value),
    });
  };

  const initForm = {
    inputs: {
      name: "",
      priority: {},
      ...filters,
    },
  };

  const [inputs, setInputs] = useState(initForm.inputs);

  const handleSubmit = (e) => {
    dispatch(filterTodo(inputs));
    e.preventDefault();
  };

  return (
    <div className={styles.filterbar}>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          paddingX={6}
          paddingY={2}
          bgcolor={"#5d589c"}
          justifyContent="space-evenly"
        >
          <Grid item xs={6}>
            <OutlinedInput 
              fullWidth
              placeholder="Todo Name"
              id="standard-basic"
              
              size="small"
              variant="outlined"
              name="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <Select
                name="priority"
                id="priority-label"
                displayEmpty
                size="small"
                variant="outlined"
                defaultValue={inputs.priority.score || ""}
                value={inputs.priority.score || ""}
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>Choose Priority</em>
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
          <Grid item xs={1}>
            <Button type="submit" disableElevation>
              FILTER
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );

};

export default FilterBar;
