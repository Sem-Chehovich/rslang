import { NavigationLinks } from "./header/header";
import { ProjectMember } from "./main/main";
import { AppPossibility } from "./main/main";
  
export const items = [
  { value: 'Textbook', href: '/dictionary', icon: 'book' }, 
  { value: '"Sprint"', href: '/game/sprint', icon: 'gamepad' }, 
  { value: '"Audio call"', href: '/audio', icon: 'headphones' }, 
  { value: 'Statistics', href: '/statistics', icon: 'balance-scale' }, 
  { value: 'Home', href: '/home', icon: 'home' }, 
  { value: 'Authorization', href: '/authorization', icon: 'user' }
] as Array<NavigationLinks>;

export const members = [
  { photo: 'madina', name: 'Madina', info: 'Authorization' }, 
  { photo: 'ann', name: 'Anna', info: 'Application main page' }, 
  { photo: 'semyon', name: 'Semyon', info: '(Team leader) Electronic textbook' }
] as Array<ProjectMember>;

export const possibilities = [
  { icon: 'book', href: '/book', name: 'Textbook', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }, 
  { icon: 'bookmark', href: '/dictionary', name: 'Dictionary', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }, 
  { icon: 'gamepad', href: '/audio', name: 'Games', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }, 
  { icon: 'balance-scale', name: 'Statistics', href: '/statistics', info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt sapiente cumque sequi quo perferendis, cupiditate deleniti illum quia, iusto officiis dolorem.' }
] as Array<AppPossibility>;