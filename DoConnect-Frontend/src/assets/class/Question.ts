import { User } from 'src/assets/class/User';
export class Question{
    questionId!:number;
    topic:string;
    question:string;
    askedDateAndTime!:any;
    isApprovedByAdmin!:boolean;
    questionImg!:any;
    user_question!:User;

    constructor(topic:string,question:string){
        this.question = question;
        this.topic = topic;
    }
}