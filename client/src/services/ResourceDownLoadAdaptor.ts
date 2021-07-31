import Taro from "@tarojs/taro";
/**
 * 资源下载适配器
 *
 */
interface IResourceAdaptorType {
  support: (strUrl: string) => boolean;
  resolve: (strUrl: string) => Promise<any> | string;
}

// 微信头像适配器 'https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erCaiaQc3iatoKLAmick8qY1e7lkf0zwtxH'
class CWXThirdAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    // console.log('CWXThirdAdaptor', strUrl)
    return strUrl.startsWith("https://thirdwx.qlogo.cn");
  };
  resolve = async (strUrl: string) => {
    return new Promise((resolve, reject) => {
      Taro.downloadFile({
        url: strUrl,
        success: (res) => {
          // console.log('CWXThirdAdaptor', res)
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          console.error("CWXThirdAdaptor", err);
          resolve(strUrl);
        },
      });
    });
  };
}

// 云存储适配器 'cloud://online-z8369.6f6e-online-z8369-1259256375/resource/banner/banner_03.jpg'
class CWXClouldAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    // console.log('CWXClouldAdaptor', strUrl)
    return strUrl.startsWith("cloud://");
  };
  resolve = async (strFileID: string) => {
    return new Promise((resolve, reject) => {
      Taro.cloud.downloadFile({
        fileID: strFileID,
        success: (res) => {
          // console.log('CWXClouldAdaptor2', res)
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          console.error("CWXClouldAdaptor3", strFileID, err);
          resolve(strFileID);
        },
      });
    });
  };
}

// 第三方网络图片适配器 'https://pic1.zhimg.com/v2-f172d4ce0e20dcd50614c9a5373ee7d3.jpg?source=8673f162'
class CHttpsAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    // console.log('CHttpsAdaptor', strUrl)
    return strUrl.startsWith("https://");
  };
  resolve = async (strUrl: string) => {
    return new Promise((resolve, reject) => {
      Taro.downloadFile({
        url: strUrl,
        success: (res) => {
          console.log("CHttpsAdaptor2", res);
          resolve(res.tempFilePath);
        },
        fail: (err) => {
          console.error("CHttpsAdaptor3", strUrl, err);
          resolve(strUrl);
        },
      });
    });
  };
}

// 本地图片适配器 '/images/mine/badge_01.png'
class CLocalAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    // console.log('CLocalAdaptor', strUrl)
    return strUrl.startsWith("/images/");
  };
  resolve = async (strUrl: string) => {
    return strUrl;
  };
}

// 微信临时图片适配器 'wxfile://tmp_53fb2ae68e6452d0c1a19f2f045896d0.png'
class CTmpAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    // console.log('CTmpAdaptor', strUrl)
    return strUrl.startsWith("wxfile://tmp");
  };
  resolve = async (strUrl: string) => {
    return strUrl;
  };
}

// 兜底适配器
class COtherAdaptor implements IResourceAdaptorType {
  support = (strUrl: string) => {
    return true;
  };
  resolve = (strUrl: string) => {
    let strResult = strUrl;
    console.error("COtherAdaptor", strResult);
    return "url-unknown";
  };
}

const arrAdaptors = [
  new CWXThirdAdaptor(), // 微信头像适配器
  new CWXClouldAdaptor(), // 云存储适配器
  new CHttpsAdaptor(), // 第三方网络图片适配器
  new CLocalAdaptor(), // 本地图片适配器
  new CTmpAdaptor(), // 微信临时图片适配器
  new COtherAdaptor(), // 兜底适配器
];

const checkAdaptor = async (strUrl) => {
  let strResult = strUrl;

  for (let adaptor of arrAdaptors) {
    if (adaptor.support(strUrl)) {
      strResult = await adaptor.resolve(strUrl);
      // console.log('ResourceDownLoadAdaptor2', strResult)
      break;
    }
  }

  return strResult;
};

export const ResourceDownLoadAdaptor = {
  apply: async (strUrl) => {
    const strResult = await checkAdaptor(strUrl);
    // console.log('ResourceDownLoadAdaptor3', strResult)
    return strResult;
  },
};

export default ResourceDownLoadAdaptor;
