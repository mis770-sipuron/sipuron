// Green API response and webhook types

export interface GreenApiResponse {
  idMessage: string;
}

export interface GreenApiGroup {
  id: string;
  name: string;
  participants: string[];
  creation: number;
}

export interface GreenApiWebhook {
  typeWebhook: string;
  instanceData: {
    idInstance: number;
    wid: string;
    typeInstance: string;
  };
  timestamp: number;
  body: {
    typeWebhook?: string;
    senderData?: {
      chatId: string;
      sender: string;
      senderName: string;
    };
    messageData?: {
      typeMessage: string;
      textMessageData?: {
        textMessage: string;
      };
      extendedTextMessageData?: {
        text: string;
      };
      fileMessageData?: {
        downloadUrl: string;
        caption: string;
        fileName: string;
        mimeType: string;
      };
    };
    idMessage?: string;
  };
}
