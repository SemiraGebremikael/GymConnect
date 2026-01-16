import { UserDto } from "./userDto";

export class MessageResponseDto {
    id : string = '';
    content : string = '';
    createdAt : Date = new Date();
    sender : UserDto | null = null;
    receiver : UserDto | null = null;
}
