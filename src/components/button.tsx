
import classes from "./button.module.css";

function AdminButton(props:any) {
  let buttonClass = classes.button;

  if (props.type === "yellow") {
    buttonClass = classes.button + " " + classes.yellow;
  } else if (props.type === "green") {
    buttonClass = classes.button + " " + classes.green;
  } else if (props.type === "black") {
    buttonClass = classes.button + " " + classes.black;
  } else if (props.type === "red") {
    buttonClass = classes.button + " " + classes.red;
  }

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

export default AdminButton;
