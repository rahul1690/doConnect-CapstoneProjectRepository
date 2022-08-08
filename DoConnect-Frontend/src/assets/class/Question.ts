export class Question{
    questionId!:number;
    topic:string;
    question:string;
    askedDateAndTime!:any;
    isApprovedByAdmin!:boolean;
    questionImg!:any;

    constructor(topic:string,question:string){
        this.question = question;
        this.topic = topic;
    }
}