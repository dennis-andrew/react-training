import PageHeader from "../components/PageHeader";
import "./InfoPage.css";

const Contact = () => {
  return (
    <>
      <PageHeader subtitle="Contact" title="Contact" />
      <main className="info-page">
        <h2>Contact Us</h2>
        <p>Email: support@furniro.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Address: 400 University Drive Suite 200 Coral Gables, FL 33134 USA</p>
      </main>
    </>
  );
};

export default Contact;
