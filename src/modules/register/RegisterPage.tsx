import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  return (
    <section className="register" aria-labelledby="register-title">
      <title>Register | DH Bags</title>
      <h1 className="section-title" id="register-title">
        Create an account
      </h1>
      <RegisterForm />
    </section>
  );
}
