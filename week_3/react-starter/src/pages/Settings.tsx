import { type FC, useState } from "react";

const Settings: FC = () => {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <section className="page-box">
      <h2>Settings</h2>
      <p>Update simple dashboard settings here.</p>

      <div className="settings-row">
        <input
          id="email-alerts"
          type="checkbox"
          checked={emailAlerts}
          onChange={(event) => setEmailAlerts(event.target.checked)}
        ></input>
        <label htmlFor="email-alerts">Email alerts</label>
      </div>

      <div className="settings-row">
        <input
          id="dark-mode"
          type="checkbox"
          checked={darkMode}
          onChange={(event) => setDarkMode(event.target.checked)}
        ></input>
        <label htmlFor="dark-mode">Dark mode</label>
      </div>
    </section>
  );
};

export default Settings;
