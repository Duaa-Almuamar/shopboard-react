// Native HTML validation only. There is no account server, so nothing is sent.
import type { FormEvent } from "react";

import { useToastStore } from "../../shared/ui/toast.state";

export default function RegisterForm() {
  const showToast = useToastStore((state) => state.showToast);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Demo form: no account was created");
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <p className="form-field">
        <label htmlFor="name">Full name</label>
        <input id="name" name="name" type="text" autoComplete="name" required minLength={2} />
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
        <small className="form-hint" id="password-hint">
          At least 8 characters.
        </small>
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
        <small className="form-hint" id="phone-hint">
          Digits, spaces, +, - and ( ) only.
        </small>
      </p>

      <p className="form-field form-field-check">
        <input id="terms" name="terms" type="checkbox" required />
        <label htmlFor="terms">I agree to the terms and conditions</label>
      </p>

      <button className="button" type="submit">
        Register
      </button>
    </form>
  );
}
