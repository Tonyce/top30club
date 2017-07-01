
// export const apiMap: {[key: string]: any} = {
//   "/": {
//     path: "/api/articles",
//     key: "articles",
//     value: "newer",
//   },
// };

interface APIMAP {
  path: string;
  key: string;
  value: string;
}

export function apiMap(url: string): APIMAP {
  const urlArr: string[] = url.split("/");
  // console.log(urlArr);
  let path: string = "";
  let key: string = "";
  let value: string = "";

  switch (urlArr && urlArr[1]) {
    case "": {
      path = "/api/articles";
      key = "articles";
      value = "newer";
    }
      break;
    case "info": {
      path = `/api/articles/${urlArr[2]}`;
      key = "article";
      value = "";
    }
      break;
    default :
     path = "";
  }

  return {
    path,
    key,
    value
  };
};



