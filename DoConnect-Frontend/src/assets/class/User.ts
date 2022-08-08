export class User{
    userId!:number;
    firstName!:string;
    lastName!:string;
    email!:string;
    username!:string;
    password:string;
    phoneNumber!:number;

    constructor(firstName:string,lastName:string,email:string,username:string,password:string,phoneNumber:number){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}