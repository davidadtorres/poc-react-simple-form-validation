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

class ValidSelect extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <TextField
        select
        id={this.props.id}
        label={this.props.label}
        value={this.props.value}
        error={this.props.error}
        onChange={(event: React.ChangeEvent<{ value: string }>) =>
          this.props.onChange(event)
        }
        helperText={this.props.helperText}
      >
        {this.props.options.map((option) => (
          <MenuItem key={option.key} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    );
  }
}

export default ValidSelect;
