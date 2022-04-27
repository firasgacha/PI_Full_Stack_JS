import styles from "../styles/Searchbar.module.css";
const Searchbar = ({ ...rest }) => {
  return (
    <div className={styles.coin__search}>
      <input className={styles.coin__input} {...rest} />
    </div>
  );
};
export default Searchbar;
