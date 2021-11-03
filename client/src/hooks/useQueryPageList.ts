/**
 * useQueryPageList使用说明
 * 通过整合useEffect、useDidShow、useReachBottom、usePullDownRefresh等生命周期，
 * 封装的统一请求分页数据的Hook
 * 注意事项：
 * 1、该Hook只能在页面处使用，严禁在频繁注册、销毁的组件内使用。
 * 2、useDidShow回调中一次最多加载PAGE_NUM_LOCK*PAGE_SIZE条数据，防止只加载PAGE_SIZE条数据导致页面数据减少被拉回，同时也防止一次性加载过多数据会导致异常错误。
 * 3、通过检测funFetchApi、param的变化，而重新加载第一分页新数据，以适配tab切的情况。
 * @param callback 获取到的列表数据回调函数
 * @param funFetchApi 请求数据的接口函数
 * @param param 请求数据的必要参数
 * @param isUpdateList 修改则主动触发onShow刷新
 */

// 调用Hook示例  ./src/pages/card-cooperation/cooperation-manage/index.tsx
// import useQueryPageList from '@hooks/useQueryPageList'
// useQueryPageList(
//   res => {
//     const { state, list, totalCount } = res
//     switch (state) {
//       case 'RESULT':
//         setLoadingTip(true)
//         setBottomTip(true)
//         setCustomList(list)
//         break
//       case 'LOADING':
//         setLoadingTip(true)
//         break;
//       case 'REACH_BOTTOM':
//         setBottomTip(true)
//         break;
//       default:
//         break
//     }
//   },
//   Api.cardHolder.queryCardFriend,
//   {}
// )

import { useRef, useEffect } from "react";
import { useReachBottom, usePullDownRefresh, useDidShow } from "@tarojs/taro";
import useDebounce from "@/hooks/useDebounce";

const PAGE_NUM_LOCK = 3;
const PAGE_SIZE = 30;

const useQueryPageList = (
  callback: any,
  funFetchApi: any = null,
  param: any = undefined,
  isUpdateList: boolean = false
) => {
  const nPageNum = useRef<number>(0);
  const nTotalCount = useRef<number>(0);
  const arrPageList = useRef<Array<any>>([]);

  const isInitComplate = useRef<boolean>(false);
  const funFetchApiTmp = useRef(undefined);
  const paramTmp = useRef(undefined);

  const nPageSize = param?.nPageSize ? param?.nPageSize : PAGE_SIZE;

  /**
   * 统一处理接口返回数据
   * @param res
   */
  const dealFetchResult = (res: any) => {
    const data = res;
    const list = data?.dataList ? data?.dataList : [];
    const totalCount =
      data?.totalCount === undefined
        ? 9999
        : data?.totalCount
        ? data?.totalCount
        : 0;
    nTotalCount.current = totalCount;
    return {
      list,
      totalCount,
    };
  };

  /**
   * 统一返回结果数据
   */
  const returnCallBack = () => {
    callback &&
      callback({
        state: "RESULT",
        list: arrPageList.current,
        totalCount: nTotalCount.current,
      });
  };

  /**
   * 监听funFetchApi、param其中之一发生变化：重新请求一次第一分页
   * 新增防抖操作，只取短时间内最后一次的请求结果
   */
  useEffect(
    useDebounce(() => {
      const isNotUndefined =
        !(funFetchApi === undefined) && !(param === undefined);
      const isDiff =
        funFetchApiTmp.current !== funFetchApi ||
        JSON.stringify(paramTmp.current) !== JSON.stringify(param);
      if (isNotUndefined && isDiff) {
        // console.log("useQueryPageList useEffect", funFetchApi, param);
        funFetchApiTmp.current = funFetchApi;
        paramTmp.current = param;
        nPageNum.current = 0;
        callback && callback({ state: "LOADING" });
        const paramReal = {
          ...param,
          pageNum: nPageNum.current,
          pageSize: nPageSize,
        };
        funFetchApi &&
          funFetchApi(paramReal).then((res) => {
            console.log("useQueryPageList useUpdateApiOrParam", res);
            const { list } = dealFetchResult(res);
            arrPageList.current = list;
            isInitComplate.current = true;
            returnCallBack();
          });
      }
    }, 500),
    [funFetchApi, param]
  );

  /**
   * 监听isUpdateList变化：用于主动触发刷新
   */
  useEffect(() => {
    if (!callback || !funFetchApi) {
      return;
    }
    if (isInitComplate.current) {
      callback({ state: "LOADING" });
      // 一次最多加载(PAGE_NUM_LOCK + 1) * PAGE_SIZE条数据
      nPageNum.current =
        nPageNum.current >= PAGE_NUM_LOCK ? PAGE_NUM_LOCK : nPageNum.current;
      const paramReal = {
        ...param,
        pageNum: 0,
        pageSize: (nPageNum.current + 1) * nPageSize,
      };
      funFetchApi(paramReal).then((res) => {
        console.log("useQueryPageList useUpdateList", res);
        const { list } = dealFetchResult(res);
        arrPageList.current = list;
        returnCallBack();
      });
    }
  }, [isUpdateList]);

  /**
   * onShow声明周期：重新获取数据（注：第一次进入页面虽触发onShow不过不执行获取数据操作）
   */
  useDidShow(() => {
    if (!callback || !funFetchApi) {
      return;
    }
    if (isInitComplate.current) {
      callback({ state: "LOADING" });
      // 一次最多加载PAGE_NUM_LOCK * PAGE_SIZE条数据
      nPageNum.current =
        nPageNum.current >= PAGE_NUM_LOCK ? PAGE_NUM_LOCK : nPageNum.current;
      const paramReal = {
        ...param,
        pageNum: 0,
        pageSize: (nPageNum.current + 1) * nPageSize,
      };
      funFetchApi(paramReal).then((res) => {
        console.log("useQueryPageList useDidShow", res);
        const { list } = dealFetchResult(res);
        arrPageList.current = list;
        returnCallBack();
      });
    }
  });

  /**
   * 触底生命周期：加载下一分页数据
   */
  useReachBottom(() => {
    if (!callback || !funFetchApi) {
      return;
    }
    if (nPageNum.current * nPageSize > nTotalCount.current) {
      return;
    }
    callback({ state: "REACH_BOTTOM" });
    nPageNum.current++;
    const paramReal = {
      ...param,
      pageNum: nPageNum.current,
      pageSize: nPageSize,
    };
    funFetchApi(paramReal).then((res) => {
      console.log("useQueryPageList useReachBottom", res);
      const { list } = dealFetchResult(res);
      arrPageList.current = arrPageList.current.concat(list);
      returnCallBack();
    });
  });

  /**
   * 下拉刷新生命周期：重新加载第一分页数据
   */
  usePullDownRefresh(() => {
    if (!callback || !funFetchApi) {
      return;
    }
    console.log("useQueryPageList usePullDownRefresh");
    callback({ state: "LOADING" });
    nPageNum.current = 0;
    const paramReal = {
      ...param,
      pageNum: nPageNum.current,
      pageSize: nPageSize,
    };
    funFetchApi(paramReal).then((res) => {
      console.log("useQueryPageList usePullDownRefresh", res);
      const { list } = dealFetchResult(res);
      arrPageList.current = list;
      returnCallBack();
    });
  });
};

export default useQueryPageList;
