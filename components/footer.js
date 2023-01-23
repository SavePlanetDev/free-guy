import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <div className={styles.contanner}>
      <div>
        <section className="message-list">
          <section className="message -left">
            <i
              className="nes-mario"
              style={{ position: "relative", top: "120px" }}
            ></i>
            <div className="nes-balloon from-left">
              <p>Hello FreeGuys Man</p>
            </div>
          </section>
        </section>
      </div>
      <div></div>
    </div>
  );
}
