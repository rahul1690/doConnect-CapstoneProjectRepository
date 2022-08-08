import { User } from './User';
import { Question } from './Question';
export interface Answer{
    answer:string;
    question:Question;
    answeredDateAndTime:Date;
    user_answer:User;

}