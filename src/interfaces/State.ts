
import { Article } from "./Article";
import { UserInfo } from "./UserInfo";
import { Width } from "./Width";

export interface State {
  articles: Article[];
  loadingArticles: boolean;
  article: Article;
  loadingArticle: boolean;
  editor?: Article;
  // loginStatus: LoginStatus;
  userInfo?: UserInfo;
  width?: Width;
}
