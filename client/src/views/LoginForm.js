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

export default function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isEmailInvalid, setIsEmailInvalid] = useState(false);

  async function onSubmitClicked(event) {
    event.preventDefault();

    if (!email || !password) {
      setError("Please complete all fields in order to proceed!");
      return;
    }

    if (validateEmail(email)) {
      setError("The email you have entered is invalid!");
      return;
    }

    setError(null);

    const response = await User.login(email, password);
    if (response.success) {
      localStorage.setItem("authToken", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
      navigate("/task-list");
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
              <h1>Sign In</h1>
              <ErrorAlert error={error} />
              <Form className="mb-3">
                <FormGroup floating className="mt-3">
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
                Are you new? <a href="/register">Make an account here</a>
              </strong>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
