import { NavigationLink } from "./header/header";
import { ProjectMember } from "./main/main";
import { AppPossibility } from "./main/main";

export const items = [
  { value: 'Textbook', href: '/textbook', icon: 'book' }, 
  { value: '"Sprint"', href: '/sprint', icon: 'hourglass-start' }, 
  { value: '"Audio challenge"', href: '/audio', icon: 'headphones', info: 'Improve your listening comprehension and auditory memory.' }, 
  { value: 'Statistics', href: '/statistics', icon: 'balance-scale' }, 
  { value: 'Home', href: '/home', icon: 'home' }, 
  { value: 'Authorization', href: '/authorization', icon: 'user' }
] as Array<NavigationLink>;

export const members = [
  { photo: 'madina', name: 'Madina', info: 'Authorization, "Sprint"'}, 
  { photo: 'ann', name: 'Anna', info: 'Application main page, "Audio challenge"'}, 
  { photo: 'semyon', name: 'Semyon', info: '(Team leader) Electronic textbook, dictionary'}
] as Array<ProjectMember>;

export const possibilities = [
  { icon: 'book', href: '/textbook', name: 'Textbook', info: 'Amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }, 
  { icon: 'gamepad', href: '/games', name: 'Games', info: 'Reinforce your memorization and auditory perception in a playful way.' }, 
  { icon: 'balance-scale', name: 'Statistics', href: '/statistics', info: 'Sectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }
] as Array<AppPossibility>;
