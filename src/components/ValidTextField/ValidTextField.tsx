import React from "react";
import TextField from "@material-ui/core/TextField";

interface Props {
  id: string;
  label: string;
  value: string;
  onChange(event: React.ChangeEvent<{ value: string }>): void;
  error: boolean;
  helperText: string;
}

class ValidTextField extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render(): JSX.Element {
    return (
      <TextField
        className="validtextfield"
        id={this.props.id}
        label={this.props.label}
        value={this.props.value}
        error={this.props.error}
        onChange={(event: React.ChangeEvent<{ value: string }>) =>
          this.props.onChange(event)
        }
        helperText={this.props.helperText}
      />
    );
  }
}

export default ValidTextField;
