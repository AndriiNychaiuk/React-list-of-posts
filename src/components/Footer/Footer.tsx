import React from 'react';
import './Footer.scss'

interface Props {
  onSetPage: React.Dispatch<React.SetStateAction<number>>,
  firstPage: boolean,
  lastPage: boolean,
}

export const Footer = React.memo<Props>(({
   onSetPage, firstPage, lastPage 
}) => (
  <footer className="footer">
    <button 
      type="button"
      className="footer__button footer__button--prev"
      onClick={() => onSetPage(prev => prev - 1)}
      disabled={firstPage}
    >
      <div 
        className="footer__arrow footer__arrow--left" 
        style={firstPage ? { borderColor: '#666' } : {}}
      />
      Previous
    </button>

    <button 
      type="button"
      className="footer__button footer__button--next"
      onClick={() => onSetPage(prev => prev + 1)}
      disabled={lastPage}
    >
      Next
      <div 
        className="footer__arrow footer__arrow--right" 
        style={lastPage ? { borderColor: '#666' } : {}}
      />
    </button>
  </footer>
))