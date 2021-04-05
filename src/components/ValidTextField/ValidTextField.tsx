import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  id?: string;
  label: string;
  value: string;
  onChange(event: React.ChangeEvent<{ value: string }>): void;
  error: boolean;
  helperText: string;
}

const ValidTextField = (props: Props): JSX.Element => {
  return (
    <TextField
      className="validtextfield"
      id={props.id}
      label={props.label}
      value={props.value}
      error={props.error}
      onChange={(event: React.ChangeEvent<{ value: string }>) =>
        props.onChange(event)
      }
      helperText={props.helperText}
    />
  );
};

export default ValidTextField;
