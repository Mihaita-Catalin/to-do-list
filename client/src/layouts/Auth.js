import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth(props) {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken") && localStorage.getItem("user")) {
      navigate("/task-list");
    }
  });

  return <>{props.view}</>;
}
