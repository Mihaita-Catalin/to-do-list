import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../sdk/user.sdk";

import { redirectToLogin } from "../utils/helpers";

export default function Dashboard(props) {
  const navigate = useNavigate();

  async function checkSession() {
    const response = await User.checkSession(localStorage.getItem("authToken"));
    if (!response.success) {
      redirectToLogin(navigate);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("authToken") || !localStorage.getItem("user")) {
      redirectToLogin(navigate);
    }

    checkSession();
  });

  return <>{props.view}</>;
}
