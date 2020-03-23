const baseUrl = "https://api.ofzhiyuan.wang";
function request(method, url, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      method,
      success(res) {
        resolve(res);
      },
      fail(err) {
        reject({
            msg: '请求失败',
            url: url,
            method,
            data
          });
      }
    });
  });
}
function get(url, data) {
  const fullUrl = baseUrl + url;
  return request("GET", fullUrl, data);
}
function post(url, data) {
  const fullUrl = baseUrl + url;
  return request("POST", fullUrl, data);
}
function put(url,data){
  const fullUrl = baseUrl + url;
  return request("PUT", fullUrl, data);

}
export { request, get, post,put };
