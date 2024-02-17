export type MessageRequest = {
  message_uuid?: string;
  channel: "whatsapp";
  message_type: "text" | "custom" | "unsupported" | "reply";
  to: string;
  from: string;
  text?: string;
  custom?: any;
  reply?: any;
  profile?: any;
};

export enum Lang {
  FR = "FR",
  AR = "AR",
}
