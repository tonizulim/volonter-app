import Location from "../components/location";
import ContactForm from "../components/ContactForm";
import classes from "./pocetna.module.css";
import ContactData from "../components/ContactData";
import Header from "../components/Header";

function Pocetna() {
  return (
    <>
    <Header />
    <div className={classes.home}>
      <div className={classes.text}>
        <h2>O nama</h2>
        <p>
        Aplikacija za volontiranje pruža korisnicima početnu stranicu s pregledom svrhe i značajki,
        popise trenutnih aktivnosti, volontera i volonterskih udruga. Na početnoj stranici, korisnici 
        mogu saznati osnovne informacije o aplikaciji i uputstva za korištenje, te se potaknuti na 
        registraciju ili prijavu. Stranica "Popis aktivnosti" omogućuje korisnicima pregled i prijavu 
        na trenutne volonterske aktivnosti, dok stranice "Popis volontera" i "Popis volonterskih udruga"
        omogućuju pregled volontera i udruga s osnovnim informacijama, pružajući korisnicima mogućnost
        povezivanja i suradnje. Ove stranice zajedno čine temelj aplikacije, olakšavajući korisnicima 
        sudjelovanje u volontiranju i povezivanje s volonterima i udrugama.
        </p>
        
      </div>
      <div className={classes["location-map"]}>
        <h2>Lokacija</h2>
        <Location />
      </div>
      <div className={classes.contact}>
        <ContactData />
        <ContactForm />
      </div>
    </div>
    </>
  );
}

export default Pocetna;