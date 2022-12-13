import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../Services/useFetch";
import {
  Form,
  Button,
  FormLayout,
  TextField,
  InlineError,
  Text,
} from "@shopify/polaris";
import Storage from "../Services/Storage";

const Login = () => {
  const [extractMethod] = Storage();

  type err = {
    [index: string]: string;
  };
  type profile = {
    username: string;
    password: string;
  };

  const [info, setInfo] = useState<profile>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState<err>({});
  const [loading, setLoading] = useState<boolean>(false);
  var [extractDataFromAPI] = useFetch();
  // TEMP VARIABLE
  const infoError: err = {};

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    if (info.username === "") {
      infoError["userError"] = "Username is required";
    }

    if (info.password === "") {
      infoError["passwordError"] = "Password is required";
    }
    setError({ ...infoError });

    if (!Object.keys(infoError).length) {
      setLoading(true);
      extractDataFromAPI
        .post(`https://fbapi.sellernext.com/user/login`, {
          endpoints: `?username=${info.username}&password=${info.password}`,
        })
        .then((actualData) => {
          if (actualData.success) {
            console.log(actualData);
            navigate("/dashboard");
            extractMethod.set("note", actualData.data.token);
          } else {
            setError({ invalid: "UserName or Password is Invalid" });
          }
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div className="login-page">
      <div className="loginForm">
        <div className="heading">
          <Text variant="headingXl" as="h2">
            Login Form
          </Text>
        </div>
        {/* USERNAME PASSWORD IS INVALID ERROR */}
        {info.username !== "" &&
        info.password !== "" &&
        Object.keys(error).find((item) => item === "invalid") ? (
          <InlineError message={error.invalid} fieldID="username" />
        ) : null}
        <div className="loginData">
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                label="Username"
                id="username"
                value={info.username}
                onChange={(value) => {
                  setInfo({ ...info, username: value });
                }}
                autoComplete="off"
                requiredIndicator
              />
              {Object.keys(error).find((item) => item === "userError") ? (
                <InlineError message={error.userError} fieldID="username" />
              ) : null}

              <TextField
                type="password"
                id="password"
                label="Password"
                value={info.password}
                onChange={(value) => {
                  setInfo({ ...info, password: value });
                }}
                autoComplete="off"
                requiredIndicator
              />
              {Object.keys(error).find((item) => item === "passwordError") ? (
                <InlineError message={error.passwordError} fieldID="password" />
              ) : null}

              {loading ? (
                <Button submit loading>
                  Login
                </Button>
              ) : (
                <Button submit primary>
                  Login
                </Button>
              )}
            </FormLayout>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
