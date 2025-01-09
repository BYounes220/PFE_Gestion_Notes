import Form from "../../components/auth/Form";

function Login() {
	return <Form route="/accounts/api/token/" method="login" />;
}

export default Login;
