import RegisterForm from "../RegisterForm";

Register.propTypes = {};

function Register(props) {
  const handleSubmit = (values) => {
    console.log("Handle Submit", values);
  };
  return (
    <div>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
