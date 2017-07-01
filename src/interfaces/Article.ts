
import { UserInfo } from "./UserInfo";

export type DataItemType = "text" | "code" | "photo" | "video" | "markdown";

export interface DataItem {
  type: DataItemType;
  content?: string;   // text / markdown
  title?: string;     // 小标题
  code?: string;      // code
  codeType?: string;  // codeType
  src?: string;       // image / video
}
export interface Article {
  _id?: string;
  authorId?: number;
  authorInfo?: UserInfo;
  title?: string;
  labels?: string[];
  time?: string;
  show?: DataItem;
  datas?: DataItem[];
  read?: number;
  good?: number;
  favorite?: number;
  hasGood?: boolean;
  hasFavorite?: boolean;
  enable?: boolean;
}
