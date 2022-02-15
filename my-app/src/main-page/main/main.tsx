import './main.css';
import { members, possibilities } from '../main-page-constants';
import { Outlet, Link } from "react-router-dom";

export interface ProjectMember {
  [key: string]: string
}

export interface AppPossibility {
  [key: string]: string
}

function Main() {
  return (
    <section className='main-content'>
      <div className='main-content__app-description'>
        <h1>Rs-lang</h1>
        <h3>will become your faithful friend on the way of learning English by memorizing new words, playing mini-games and tracking your individual progress</h3>
        {/* <div className='main-content__png'></div> */}
      </div>
      <div>
        <h3 className='main-content__headers'>Possibilities and advantages</h3>
        <div className='main-content__app-advantages'>
          {possibilities.map((possibility: AppPossibility) =>
          <Link key={possibility.name} to={possibility.href}>
            <div  className='main-content__app-advantages-item'>
              <i className={'fa fa-'+ possibility.icon + ' fa-5x'}></i>
              <h3>{possibility.name}</h3>
              <p>{possibility.info}</p>
            </div>
          </Link>
          )}
        </div>
      </div>
      <h3 className='main-content__headers'>Our team</h3>
      <div className='main-content__team-info'>
        {members.map((member: ProjectMember) =>
        <div key={member.name} className='main-content__team-info-item'>
          <h2>{member.name}</h2>
          <div className={`team-info-item__photo team-info-item__photo-${member.photo}`}></div>
          <p>{member.info}</p>
        </div>
        )}
      </div>
      <Outlet />
    </section>
  );
}

export default Main;
