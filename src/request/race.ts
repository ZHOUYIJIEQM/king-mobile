import request from "./request";

const RaceReq = {
  getRaceArticle: (params: any) => {
    return request({
      url: '/race/center',
      method: 'POST',
      data: params
    })
  }
}

export default RaceReq