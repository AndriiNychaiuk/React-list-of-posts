import React from 'react';
import './Footer.scss'

interface Props {
  firstPage: boolean,
  lastPage: boolean,
  onSetPage: React.Dispatch<React.SetStateAction<number>>,
}

export const Footer = React.memo<Props>(({
  firstPage, lastPage, onSetPage, 
}) => (
  <footer className="footer">
    <div className="buttons">
      <button 
        type="button"
        className="buttons__button buttons__button--prev"
        onClick={() => onSetPage(prev => prev - 1)}
        disabled={firstPage}
      >
        <div 
          className="buttons__arrow buttons__arrow--left" 
          style={firstPage ? { borderColor: '#666' } : {}}
        />
        Previous
      </button>

      <button 
        type="button"
        className="buttons__button buttons__button--next"
        onClick={() => onSetPage(prev => prev + 1)}
        disabled={lastPage}
      >
        Next
        <div 
          className="buttons__arrow buttons__arrow--right" 
          style={lastPage ? { borderColor: '#666' } : {}}
        />
      </button>
    </div>
  </footer>
))