import { useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import ErrorAlert from "../components/ErrorAlert";
import validateEmail from "../utils/validations";
import { User } from "../sdk/user.sdk";

export default function RegisterForm() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(null);

  async function onSubmitClicked(event) {
    event.preventDefault();

    if (!name || !email || !password || !confirmedPassword) {
      setError("Please complete all fields in order to proceed!");
      console.log(error);
      return;
    }

    if (validateEmail(email)) {
      setError("The email you have entered is invalid!");
      return;
    }

    if (password !== confirmedPassword) {
      setError("The passwords do not match!");
      return;
    }

    setError(null);

    const response = await User.register(name, email, password);
    if (response.success) {
      navigate("/login");
    } else {
      setError(response.msg);
      return;
    }
  }

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <h1>Register</h1>
              <ErrorAlert error={error} />
              <Form className="mb-3">
                <FormGroup floating>
                  <Input
                    id="nameField"
                    name="name"
                    placeholder="Name"
                    onChange={(event) => setName(event.target.value)}
                  />
                  <Label for="nameField">Name</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    invalid={isEmailInvalid}
                    id="emailField"
                    name="email"
                    placeholder="Email"
                    type="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setIsEmailInvalid(validateEmail(email));
                    }}
                  />
                  <Label for="emailField">Email</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    id="passwordField"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                  />
                  <Label for="passwordField">Password</Label>
                </FormGroup>
                <FormGroup floating>
                  <Input
                    id="confirmPasswordField"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    type="password"
                    onChange={(event) => setConfirmedPassword(event.target.value)}
                  />
                  <Label for="confirmPasswordField">Confirm password</Label>
                </FormGroup>
                <Button
                  outline
                  color="primary"
                  tag="input"
                  type="submit"
                  value="Submit"
                  onClick={(event) => onSubmitClicked(event)}
                />
              </Form>
              <strong>
                Already have an account? <a href="/login">Sign in here</a>
              </strong>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
