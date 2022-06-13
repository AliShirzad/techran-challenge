import { Link } from "react-router-dom";
import styles from "./layout.module.css";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <nav className={styles.nav}>
        <Link to="/table-page">Table Page</Link>
        <Link to="/">Form Page</Link>
      </nav>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
