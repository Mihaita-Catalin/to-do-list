import { useState } from "react";
import { Button, Card, CardBody, Input, Badge } from "reactstrap";

import { Task } from "../sdk/task.sdk";

export default function TaskComponent(props) {
  const [oldTitle, setOldTitle] = useState(props.task.title);
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(props.task.title);

  async function onTitleChanged(title) {
    const response = await Task.updateTask(
      localStorage.getItem("authToken"),
      props.task._id,
      title,
      props.task.solved
    );
    if (!response.success) {
      alert("Something went wrong! Please try again later!");
      return;
    }
    setOldTitle(title);
  }

  return (
    <Card className="mb-2">
      <CardBody style={{ textAlign: "center" }}>
        {isEditMode ? (
          <>
            <Input
              className="mb-2"
              name="newTitle"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <Button
              className="me-2"
              color="secondary"
              onClick={() => {
                onTitleChanged(title);
                setIsEditMode(false);
              }}
            >
              Save
            </Button>
            <Button
              className="ms-2"
              color="danger"
              onClick={() => {
                setTitle(oldTitle);
                setIsEditMode(false)}}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <h3>
              {title}
              {props.task.solved ? (
                <h5 style={{ display: "inline" }}>
                  <Badge className="ms-3" size="xs" color="success">
                    Solved
                  </Badge>
                </h5>
              ) : null}
            </h3>
            <Button
              className="me-2"
              color="secondary"
              onClick={() => setIsEditMode(true)}
            >
              Edit
            </Button>
            <Button
              className="ms-2 me-2"
              color="primary"
              onClick={() => props.onModifyPressed()}
            >
              Mark as {props.task.solved ? "not solved" : "solved"}
            </Button>
            <Button
              className="ms-2"
              color="danger"
              onClick={() => props.onDeleteClicked()}
            >
              Delete
            </Button>
          </>
        )}
      </CardBody>
    </Card>
  );
}
