const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.userinfo.username,
  staffPhoto: state => state.user.userinfo.staffPhoto, // 建立用户头像的映射
  companyId: state => state.user.userinfo.companyId
}
export default getters
