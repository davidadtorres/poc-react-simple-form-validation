import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange(event: React.ChangeEvent<{ value: string }>): void;
  error: boolean;
  helperText: string;
  options: Array<{ key: number; label: string }>;
}

const ValidSelect = (props: Props): JSX.Element => {
  return (
    <TextField
      select
      id={props.id}
      label={props.label}
      value={props.value}
      error={props.error}
      onChange={(event: React.ChangeEvent<{ value: string }>) =>
        props.onChange(event)
      }
      helperText={props.helperText}
    >
      {props.options.map((option) => (
        <MenuItem key={option.key} value={option.label}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default ValidSelect;
