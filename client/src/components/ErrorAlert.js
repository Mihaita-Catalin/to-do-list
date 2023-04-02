import { Alert } from "reactstrap";

export default function ErrorAlert({ error }) {
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }
  return;
}
