import './Header.css'

function Header() {

    return (
      <>
        <div id="header_div">
            <a href='/zavrsni_/' className="link-button">
                <button className="Header_button">Početna</button>
            </a>
             <a href='/zavrsni_/aktivnosti' className="link-button">
                <button className="Header_button">Aktivnosti</button>
            </a>
            <a href='/zavrsni_/volonteri' className="link-button">
                <button className="Header_button">Volonteri</button>
            </a>
            <a href='/zavrsni_/udruge' className="link-button">
                <button className="Header_button">Udruge</button>
            </a>
            

        </div>
      </>
    )
  }
  
  export default Header;