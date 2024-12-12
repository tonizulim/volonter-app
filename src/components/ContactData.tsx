
import classes from "./ContactData.module.css";

function ContactData() {
  return (
    <div className={classes["contact-data"]}>
      <h2>Kontakt</h2>
      <p>Kontaktirajte nas ili posjetite za više informacija</p>
      <div>
        <p>
          Adresa: <b>Ruđera Boškovića 32, 21000 Split</b>
        </p>
        <p>
          Telefon: <b>+385 95 558 4342</b>
        </p>
        <p>
          Email: <b>edit.dalmacija@gmail.com </b>
        </p>
      </div>
    </div>
  );
}

export default ContactData;
