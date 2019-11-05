import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import OutlinedInput from '@material-ui/core/OutlinedInput';
// import FilledInput from '@material-ui/core/FilledInput';
// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
      formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
    }));

export default function CustomSelect() {
    const classes = useStyles();

    return (
        <FormControl className={classes.formControl}>
            <Select
              // value={values.age}
              // onChange={handleChange}
              // name="age"
              displayEmpty
              className={classes.selectEmpty}
            >
              <MenuItem value="Popular Courses">
                Popular Courses
              </MenuItem>
              <MenuItem value={10}>Popular Courses</MenuItem>
              <MenuItem value={20}>Most Bought Courses</MenuItem>
              <MenuItem value={30}>Popular Courses</MenuItem>
            </Select>
            <FormHelperText>Select Category</FormHelperText>
        </FormControl>
    )
}