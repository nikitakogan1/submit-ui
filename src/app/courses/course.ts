import {IAssignment} from '../assignments/assignment'

export interface ICourse {
  name: string;
  assignments: IAssignment;
  year: Number
  number: Number
}
