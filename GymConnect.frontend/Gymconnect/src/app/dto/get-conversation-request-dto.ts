export class GetConversationRequestDto {
  userId: string = '';
  otherUserId: string = '';
  page: number = 1;
  pageSize: number = 20;
}
