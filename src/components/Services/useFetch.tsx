type options = {
  headers?: HeadersInit;
  method?: string;
  body?: BodyInit | null;
};

type info = {
  [index: string]: string;
};
const useFetch = () => {
  const requestOptions: options = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      authorization:
        "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyX2lkIjoiMSIsInJvbGUiOiJhcHAiLCJpYXQiOjE1MzkwNTk5NzgsImlzcyI6Imh0dHBzOlwvXC9hcHBzLmNlZGNvbW1lcmNlLmNvbSIsImF1ZCI6ImV4YW1wbGUuY29tIiwibmJmIjoxNTM5MDU5OTc4LCJ0b2tlbl9pZCI6MTUzOTA1OTk3OH0.GRSNBwvFrYe4H7FBkDISVee27fNfd1LiocugSntzxAUq_PIioj4-fDnuKYh-WHsTdIFMHIbtyt-uNI1uStVPJQ4K2oYrR_OmVe5_zW4fetHyFmoOuoulR1htZlX8pDXHeybRMYlkk95nKZZAYQDB0Lpq8gxnTCOSITTDES0Jbs9MENwZWVLfyZk6vkMhMoIAtETDXdElIdWjP6W_Q1kdzhwqatnUyzOBTdjd_pt9ZkbHHYnv6gUWiQV1bifWpMO5BYsSGR-MW3VzLqsH4QetZ-DC_AuF4W2FvdjMRpHrsCgqlDL4I4ZgHJVp-iXGfpug3sJKx_2AJ_2aT1k5sQYOMA",
    },
  };
  // POST FUNC
  async function post(url: string, info: info = {}) {
    requestOptions["method"] = "POST";
    const response = await fetch(url + info.endpoints, requestOptions);
    return await response.json();
  }

  //  GET FUNC
  async function get(url: string, info: info = {}) {
    const response = await fetch(url, requestOptions);
    return await response.json();
  }
  //PUT FUNC
  async function put(url: string, info: info = {}) {
    requestOptions["method"] = "PUT";
    requestOptions["body"] = JSON.stringify({
      title: "React PUT Request Example",
    });
    const response = await fetch(url, requestOptions);
    return await response.json();
  }

  //DELETE FUNC
  async function del(url: string) {
    const response = await fetch(url, { method: "DELETE" });
    return await response.json();
  }

  return [{ get, post, put, del }];
};

export default useFetch;
