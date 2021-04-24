import CloudFetch from '../services/CloudFetch'

interface IAddMemberInfoType {
  openid: string
  nickName: string // 昵称
  avatarUrl: string // 头像
  gender: number // 性别
  country: string // 国家
  province: string // 省份
  city: string // 城市
  language: string // 语言
}

interface IQueryMemberInfoType {
  _id: string
}

interface IArticleInfoType {
  _id: string // 文章ID
  author: string // 文章作者
  content: string // 文章内容
  href: string // 文章Url
  posterImg: string // 封面图Url
  source: string // 文章爬取源
  title: string // 文章标题
  createDate: string // 爬取时间
  collectDate?: string // 收藏时间
}

interface ICollectionArticleType {
  objArticle: IArticleInfoType
}

interface IAddMineBadgeType {
  strBadgeCode: string // 徽章Code码
}

interface IUpdateMineBorderCodeType {
  strMineBorderCode: string // 头像框（徽章）Code码
}

interface IUpdateAvatarUrlType {
  user_avatarUrl: string // 新头像url
}

/**
 * 新增注册成员信息
 * @return
 */
const addMemberInfo = async (objParams?: IAddMemberInfoType) => {
  const params = {
    type: 'ADD_MEMBER',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('addMemberInfo', res)
  return res.data
}

/**
 * 查询成员信息
 * @return
 */
const queryMemberInfo = async (objParams?: IQueryMemberInfoType) => {
  const params = {
    type: 'QUERY_MEMBER',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('queryMemberInfo', res)
  return res.data
}

/**
 * 新增会话人的文章收藏信息
 * @return
 */
const addCollectionArticle = async (objParams?: ICollectionArticleType) => {
  const params = {
    type: 'ADD_COLLECTION_ARTICLE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('addCollectionArticle', res)
  return res.data
}

/**
 * 移除会话人指定文章的收藏信息
 * @return
 */
const removeCollectionArticle = async (objParams?: ICollectionArticleType) => {
  const params = {
    type: 'REMOVE_COLLECTION_ARTICLE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('removeCollectionArticle', res)
  return res.data
}

/**
 * 激活新的徽章
 * @return
 */
const addMineBadge = async (objParams?: IAddMineBadgeType) => {
  const params = {
    type: 'ADD_MINE_BADGE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('addMineBadge', res)
  return res.data
}

/**
 * 更新头像框
 * @param objParams
 */
const updateMineBorderCode = async (objParams?: IUpdateMineBorderCodeType) => {
  const params = {
    type: 'UPDATE_MINE_BORDER_CODE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('updateMineBorderCode', res)
  return res.data
}

/**
 * 更新头像url
 * @param objParams
 */
const updateAvatarUrl = async (objParams?: IUpdateAvatarUrlType) => {
  const params = {
    type: 'UPDATE_AVATAR_URL',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchMemberInfo', params)
  console.log('updateAvatarUrl', res)
  return res.data
}

export default {
  addMemberInfo,
  queryMemberInfo,
  addCollectionArticle,
  removeCollectionArticle,
  addMineBadge,
  updateMineBorderCode,
  updateAvatarUrl
}
