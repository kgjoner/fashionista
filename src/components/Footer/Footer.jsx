import React from 'react'

import './footer.css'

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Desenvolvido por Kaio Gabriel
      </p>
      <div className="footer__links">
        <a href="https://dev.kgjoner.com.br/" 
          className="footer__link" 
          target="_blank" rel="noopener noreferrer"
          aria-label="Visitar o site de Kaio Gabriel">
          <i className="fa fa-home"></i>
        </a>
        <a href="https://www.linkedin.com/in/kaio-gabriel-da-silveira-rosa-63938011a/" 
          className="footer__link"
          target="_blank" rel="noopener noreferrer"
          aria-label="Visitar o Linkedin de Kaio Gabriel">
          <i className="fa fa-linkedin"></i>
        </a>
        <a href="https://github.com/kgjoner" 
          className="footer__link" 
          target="_blank" rel="noopener noreferrer"
          aria-label="Visitar o Github de Kaio Gabriel">
          <i className="fa fa-github"></i>
        </a>
      </div>

    </footer>
  )
}

export default Footer