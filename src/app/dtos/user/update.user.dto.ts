export class UpdateUserDTO {
  
    fullname: string;
  
    address: string;
  
    password: string;
  
    retype_password: number;
  
    date_of_birth: Date;
  
    constructor(data: any) {
      this.fullname = data.fullName;
      this.address = data.address;
      this.password = data.password;
      this.retype_password = data.retype_password;
      this.date_of_birth = data.date_of_birth;
    }
  }