import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ValidTextField from "../ValidTextField/ValidTextField";
import ValidSelect from "../ValidSelect/ValidSelect";
import Typography from "@material-ui/core/Typography";
import { Alert, AlertTitle } from "@material-ui/lab";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(5),
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "95%",
      },
    },
    title: {
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
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

type DataValidCallback = React.Dispatch<React.SetStateAction<unknown>>;

const dataValidation = (
  isValid: boolean,
  ok: DataValidCallback,
  err: DataValidCallback,
  msg: string
): void => {
  ok(isValid);
  isValid ? err("") : err(msg);
};

interface Props {
  title: string;
  width: number;
}

const ValidForm = (props: Props): JSX.Element => {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState({ value: "" });
  const [isNameOk, setIsNameOk] = React.useState(true);
  const [isTypeOk, setIsTypeOk] = React.useState(true);
  const [nameErrText, setNameErrText] = React.useState("");
  const [typeErrText, setTypeErrText] = React.useState("");
  const [visibility, setVisibility] = React.useState("hidden");

  const createErrVisible = ({
    isTypeOk,
    isNameOk,
  }: {
    isTypeOk: boolean;
    isNameOk: boolean;
  }) => {
    return function useErrVisible() {
      React.useEffect(() => {
        if (submited && (!isTypeOk || !isNameOk)) setVisibility("visible");
        else setVisibility("hidden");
      });
    };
  };
  const useErrVisible = createErrVisible({
    isTypeOk,
    isNameOk,
  });
  useErrVisible();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    submited = true;
    dataValidation(
      name !== "" && name.length >= 10,
      setIsNameOk as React.Dispatch<React.SetStateAction<unknown>>,
      setNameErrText as React.Dispatch<React.SetStateAction<unknown>>,
      nameRulesText
    );
    dataValidation(
      type.value !== "",
      setIsTypeOk as React.Dispatch<React.SetStateAction<unknown>>,
      setTypeErrText as React.Dispatch<React.SetStateAction<unknown>>,
      typeRulesText
    );
  };

  const handleNameChange = (event: React.ChangeEvent<{ value: string }>) => {
    if (submited)
      dataValidation(
        event.target.value !== "" && event.target.value.length >= 10,
        setIsNameOk as React.Dispatch<React.SetStateAction<unknown>>,
        setNameErrText as React.Dispatch<React.SetStateAction<unknown>>,
        nameRulesText
      );
    setName(event.target.value);
  };

  const handleTypeChange = (event: React.ChangeEvent<{ value: string }>) => {
    if (submited)
      dataValidation(
        event.target.value !== "",
        setIsTypeOk as React.Dispatch<React.SetStateAction<unknown>>,
        setTypeErrText as React.Dispatch<React.SetStateAction<unknown>>,
        typeRulesText
      );
    setType({ value: event.target.value });
  };

  return (
    <Box width={props.width}>
      <form
        className={classes.root}
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
      >
        <div className={classes.title}>
          <Typography variant="h3" gutterBottom>
            {props.title}
          </Typography>
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
        <Box mt={5}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
          <Box mt={2} component="div" visibility={visibility}>
            <Alert severity="error">
              <AlertTitle>¡Complete el formulario!</AlertTitle>
              Revise el <strong>formato</strong> de los datos
            </Alert>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default ValidForm;
