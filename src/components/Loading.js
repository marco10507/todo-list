import Spinner from "react-bootstrap/Spinner";

export default function Loading(props) {
  const spinnerStyle = {
    width: "50px",
    height: "50px",
    position: "absolute",
    top: "50%",
    left: "50%",
    margin: "-25px 0 0 -25px"
  };

  const isLoading = props.isLoading == null ? true : props.isLoading;

  if (isLoading) {
    return (
      <Spinner style={spinnerStyle} animation="border" variant="primary">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return props.children;
  }
}
