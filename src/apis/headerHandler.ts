
export function headerHandler(token?: string): {} {
  let headers: {} = null;
  if (token !== "") {
    headers = {
      "Accept": "application/json",
      "Authorization": `token=${token}`,
      "Content-Type": "application/json",
    };
  } else {
    headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
  }
  return headers;
};
