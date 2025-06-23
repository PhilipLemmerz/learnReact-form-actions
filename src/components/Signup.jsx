import { useActionState } from "react";
import { isEmail, hasMinLength, isNotEmpty } from "../util/validation";


export default function Signup() {

  function signUpAction(prevFormData, formData) {
    {/* es wird bei UI änderung ein neuer State erstellt basierend auf prevState -> deshalb die 2 Arguments */ }
    const mail = formData.get('email');
    const pw = formData.get('password');
    const pwConfirm = formData.get('confirm-password');
    const firstName = formData.get('first-name');
    const lastName = formData.get('last-name');
    const role = formData.get('role');
    const acquisition = formData.getAll('acquisition');

    const errors = []

    if (!isEmail(mail)) {
      errors.push('email invalid')
    }

    if (!hasMinLength(pw, 6) || isNotEmpty(pw)) {
      errors.push('password invalid');
    }

    if (pw !== pwConfirm) {
      errors.push('passwords not equal')
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { mail, pw, pwConfirm, firstName, lastName, role, acquisition } }
    } {/* das enteredValue Objekt enthält die bereits erfolgten Eingaben damit diese bei UI Änderung und neu erstellten der Component nicht lost sind und als   */ }
    {/* default Value gesetzt werden können  */ }

    if (errors.length === 0) {
      return { errors: null }
    }
  }

  const [formState, formAction, pending] = useActionState(signUpAction, { errors: null });

  return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" defaultValue={formState.enteredValues?.mail} />  {/* durch ? wird kein Wert ausgegbeben wenn entered value undefiend ist */}
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.pw} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
            defaultValue={formState.enteredValues?.pwConfirm}
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" defaultValue={formState.enteredValues?.firstName} />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" defaultValue={formState.enteredValues?.lastName} />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other" defaultChecked={formState.enteredValues?.acquisition.includes('other')} />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>

      {formState.errors && <ul className="error">
        {formState.errors.map((err) => <li key={err}>{err}</li>)}
      </ul>}
    </form>
  );
}
