import PageHeader from "../components/PageHeader";
import "./InfoPage.css";

const About = () => {
  return (
    <>
      <PageHeader subtitle="About" title="About" />
      <main className="info-page">
        <h2>About Furniro</h2>
        <p>
          Furniro is a simple furniture store demo focused on warm interiors,
          comfortable pieces, and easy shopping experiences.
        </p>
      </main>
    </>
  );
};

export default About;
