export class Answer{
    answer!:string;
    answeredUserId:any;
    answerdQuestionId:any;

    constructor(answer:string,answeredUserId:any,answeredQuestion:any){
        this.answer = answer;
        this.answerdQuestionId = answeredQuestion;
        this.answeredUserId = answeredUserId
    }
}