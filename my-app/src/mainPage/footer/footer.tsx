import './footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div>
        <a href='https://rs.school/js' target='_blank' rel="noreferrer"><img className='footer__rs-logo footer__link' src="rss.svg" alt="" /></a>
      </div>
      <div className='footer__list'>
        <a className='footer__list-item footer__link' href='https://github.com/madinan12' target='_blank' rel="noreferrer">MadinaN12</a>
        <a className='footer__list-item footer__link' href='https://github.com/anyacubed' target='_blank' rel="noreferrer">anyacubed</a>
        <a className='footer__list-item footer__link' href='https://github.com/sem-chehovich' target='_blank' rel="noreferrer">Sem-Chehovich</a>
      </div>
      <div>
        <p>2022</p>
      </div>
    </footer>
  );
}

export default Footer;
