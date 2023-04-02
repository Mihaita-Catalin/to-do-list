import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

import TaskComponent from "../components/TaskComponent";
import { Task } from "../sdk/task.sdk";

export default function TaskList() {
  const navigate = useNavigate();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    const response = await Task.getAllTasksByUser(
      localStorage.getItem("authToken"),
      JSON.parse(localStorage.getItem("user"))._id
    );
    if (response.success) {
      setTasks(response.tasks);
    } else {
      alert("Something went wrong! Please try again later!");
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  async function onAddTaskClicked(event) {
    event.preventDefault();

    const response = await Task.createTask(
      localStorage.getItem("authToken"),
      newTaskTitle,
      JSON.parse(localStorage.getItem("user"))._id
    );
    if (response.success) {
      setTasks([...tasks, response.task]);
    } else {
      alert("Something went wrong! Please try again later!");
      return;
    }

    setNewTaskTitle("");
  }

  async function onModifyPressed(task) {
    const localTasks = tasks.slice(0);
    const response = await Task.updateTask(
      localStorage.getItem("authToken"),
      task._id,
      task.title,
      !task.solved
    );
    if (!response.success) {
      alert("Something went wrong! Please try again later!");
      return;
    }
    localTasks[tasks.findIndex((localTask) => localTask._id === task._id )].solved = !task.solved;
    setTasks(localTasks); 
  }

  async function onDeleteClicked(taskId) {
    const response = await Task.deleteTask(
      localStorage.getItem("authToken"),
      taskId
    );
    if (!response.success) {
      alert("Something went wrong! Please try again later!");
      return;
    }
    setTasks(
      tasks.filter((task) => {
        return task._id !== taskId;
      })
    );
  }
  return (
    <Container className="mt-5">
      <div style={{ textAlign: "center" }}>
        <Button
          className="mb-5"
          color="danger"
          onClick={(event) => {
            localStorage.clear();
            navigate("/login");
          }}
        >Log out</Button>
      </div>
      <h1 className="mb-5" style={{ textAlign: "center" }}>
        Add a new task to your list
      </h1>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          <Card>
            <CardBody>
              <Form className="mb-3" style={{ textAlign: "center" }}>
                <FormGroup floating className="mt-3 mb-3">
                  <Input
                    id="titleField"
                    name="title"
                    placeholder="Title"
                    value={newTaskTitle}
                    onChange={(event) => setNewTaskTitle(event.target.value)}
                  />
                  <Label for="titleField">Title</Label>
                </FormGroup>
                <Button
                  outline
                  color="primary"
                  tag="input"
                  type="submit"
                  value="Add task"
                  onClick={(event) => onAddTaskClicked(event)}
                />
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <h1 className="mb-5 mt-5" style={{ textAlign: "center" }}>
        All tasks
      </h1>
      <Row>
        <Col md={{ size: 6, offset: 3 }}>
          {tasks.length === 0 ? <p className="text-center">There are no tasks yet</p> : null}
          {tasks.map((task) => (
            <TaskComponent
              key={task._id}
              task={task}
              onModifyPressed={() => onModifyPressed(task)}
              onDeleteClicked={() => onDeleteClicked(task._id)}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
