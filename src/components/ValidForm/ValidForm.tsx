import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ValidTextField from "../ValidTextField/ValidTextField";
import ValidSelect from "../ValidSelect/ValidSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(5),
      marginLeft: theme.spacing(5),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    title: {
      maxWidth: 200,
      textAlign: "center",
      color: "#F00",
      fontSize: "1.5rem",
    },
  })
);

const types = [
  { key: 1, label: "Shop" },
  { key: 2, label: "Catalog" },
];
const nameRulesText = "Expects a 10 length string";
const typeRulesText = "Required";

let submited = false;

const ValidForm: React.FC = () => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState({ value: "" });
  const [isNameOk, setIsNameOk] = React.useState(true);
  const [isTypeOk, setIsTypeOk] = React.useState(true);
  const [nameErrText, setNameErrText] = React.useState("");
  const [typeErrText, setTypeErrText] = React.useState("");

  // TODO: Create custom Effect Hook to validate to extract from ValidForm
  const validateName = (data: string, submited = false): void => {
    setName(data);
    if (!submited) return;
    if (data === "" || data.length < 10) {
      setIsNameOk(false);
      setNameErrText(nameRulesText);
    } else {
      setIsNameOk(true);
      setNameErrText("");
    }
  };

  // TODO: Create custom Effect Hook to validate to extract from ValidForm
  const validateType = (data: { value: string }, submited = false): void => {
    setType(data);
    if (!submited) return;
    if (data.value === "") {
      setIsTypeOk(false);
      setTypeErrText(typeRulesText);
    } else {
      setIsTypeOk(true);
      setTypeErrText("");
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    submited = true;
    validateName(name, submited);
    validateType(type, submited);
  };

  const handleNameChange = (event: React.ChangeEvent<{ value: string }>) => {
    validateName(event.target.value, submited);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: string }>) => {
    validateType({ value: event.target.value }, submited);
  };

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit}
      noValidate
      autoComplete="off"
    >
      <div className={classes.title}>
        <label>Cool form</label>
      </div>
      <div>
        <ValidTextField
          id="standard-text-helper-text"
          label="Name"
          value={name}
          onChange={(event: React.ChangeEvent<{ value: string }>) =>
            handleNameChange(event)
          }
          error={!isNameOk}
          helperText={nameErrText}
        />
      </div>
      <div>
        <ValidSelect
          id="standard-select-helper-text"
          label="Type"
          value={type.value}
          onChange={(event: React.ChangeEvent<{ value: string }>) =>
            handleTypeChange(event)
          }
          error={!isTypeOk}
          helperText={typeErrText}
          options={types}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};

export default ValidForm;
