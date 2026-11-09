// Same as the original: native HTML validation only, no JavaScript handling
export default function RegisterForm() {
  return (
    <section className="register" id="register" aria-labelledby="register-title">
      <h2 className="section-title" id="register-title">Create an account</h2>
      <form className="register-form" action="#" method="post">
        <p className="form-field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            minLength={2}
          />
        </p>

        <p className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </p>

        <p className="form-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            aria-describedby="password-hint"
          />
          <small className="form-hint" id="password-hint">At least 8 characters.</small>
        </p>

        <p className="form-field">
          <label htmlFor="phone">Phone (optional)</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            pattern="[0-9+ ()-]{7,20}"
            title="7–20 digits; spaces, +, - and parentheses allowed."
            aria-describedby="phone-hint"
          />
          <small className="form-hint" id="phone-hint">Digits, spaces, +, - and ( ) only.</small>
        </p>

        <p className="form-field form-field-check">
          <input id="terms" name="terms" type="checkbox" required />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </p>

        <button className="button" type="submit">Register</button>
      </form>
    </section>
  );
}
