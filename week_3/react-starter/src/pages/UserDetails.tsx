import { type ChangeEvent, type FC, type FormEvent, useState } from "react";

const UserDetails: FC = () => {
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const goToNextStep = (event: FormEvent) => {
    event.preventDefault();
    setStep(2);
    setMessage("");
  };

  const saveUser = (event: FormEvent) => {
    event.preventDefault();
    setMessage(`${formData.name} has been saved.`);
  };

  return (
    <section className="page-box">
      <h2>User Details</h2>
      <p>Step {step} of 2</p>

      {step === 1 && (
        <form className="simple-form" onSubmit={goToNextStep}>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          ></input>

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          ></input>

          <button type="submit">Next</button>
        </form>
      )}

      {step === 2 && (
        <form className="simple-form" onSubmit={saveUser}>
          <label htmlFor="department">Department</label>
          <input
            id="department"
            name="department"
            type="text"
            value={formData.department}
            onChange={handleChange}
            required
          ></input>

          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            value={formData.role}
            onChange={handleChange}
            required
          ></input>

          <div className="form-buttons">
            <button type="button" onClick={() => setStep(1)}>
              Back
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      )}

      {message && <p className="success-message">{message}</p>}
    </section>
  );
};

export default UserDetails;
