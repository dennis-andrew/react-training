import "./PageHeader.css";
import appLogo from "../assets/icons/app_logo.svg";

type PageHeaderProps = {
  title: string;
  subtitle: string;
  includeLogo?: boolean;
};

const PageHeader = ({
  title,
  subtitle,
  includeLogo = true,
}: PageHeaderProps) => {
  return (
    <header className="page-header">
      {includeLogo && <img src={appLogo} alt="App Logo" />}
      <h2>{title}</h2>
      <p>
        <strong>Home &gt;</strong> {subtitle}
      </p>
    </header>
  );
};

export default PageHeader;
