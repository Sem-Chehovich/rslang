import './Main.css';

interface ProjectMembers {
  photo: string,
  name: string,
  info: string
}

interface AppPossibility {
  icon: string,
  name: string,
  info: string
}

function Main() {
  return (
    <div className='main-content'>
      <div className='main-content__app-description'>
        <h1>Rs-lang</h1>
        <h3>will become your faithful friend on the way of learning English by memorizing new words, playing mini-games and tracking your individual progress</h3>
        <div className='main-content__png'></div>
      </div>
      <div>
        <h3 className='main-content__headers'>Possibilities and advantages</h3>
        <AppPossibilities />
      </div>
      <h3 className='main-content__headers'>Our team</h3>
      <TeamInfo />
    </div>
  );
}

function TeamInfo() {
  const members = [{photo: 'madina', name: 'Madina', info: 'Authorization'}, {photo: 'ann', name: 'Anna', info: 'Application main page'}, {photo: 'semyon', name: 'Semyon', info: '(Team leader) Electronic textbook'}] as Array<ProjectMembers>;
  return (
    <div className='main-content__team-info'>
    {members.map((member) =>
    <div key={member.name} className='main-content__team-info-item'>
      <h2>{member.name}</h2>
      <div className={'team-info-item__photo' + ` team-info-item__photo-${member.photo}`}></div>
      <p>{member.info}</p>
    </div>
    )}
  </div>
  )
}

function AppPossibilities() {
  const possibilities = [{icon: 'book', name: 'Textbook', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.'}, {icon: 'bookmark', name: 'Dictionary', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.'}, {icon: 'gamepad', name: 'Games', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.'}, {icon: 'balance-scale', name: 'Statistics', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.'}] as Array<AppPossibility>;
  return (
    <div className='main-content__app-advantages'>
    {possibilities.map((possibility) =>
    <a key={possibility.name} href='#' className='main-content__app-advantages-item'>
      <i className={'fa fa-'+ possibility.icon + ' fa-5x'}></i>
      <h3>{possibility.name}</h3>
      <p>{possibility.info}</p>
    </a>
    )}
  </div>
  )
}

export default Main;