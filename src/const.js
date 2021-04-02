import { v4 as uuidv4 } from 'uuid';

const employees = {
  id: uuidv4 (),
  first: '',
  last: '',
  declaration: '',
  department: '',
};

const prizes = [{
  id: uuidv4 (),
  name: 'Macbook Pro',
  level: 'premium',
  count: '3',
  intro: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Optio, reprehenderit.',
}, {
  id: uuidv4 (),
  name: 'Macbook Air',
  level: 'high',
  count: '5',
  intro:  'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel beatae vitae veritatis, praesentium magnam quas.',
}, {
  id: uuidv4 (),
  name: 'PS4',
  level: 'medium',
  count: '1',
  intro:  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quis, officiis.',
}];

export { employees, prizes };
