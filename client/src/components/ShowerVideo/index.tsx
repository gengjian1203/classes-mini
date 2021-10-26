import React, { useState, useEffect, useRef, Fragment } from "react";
import { useSelector } from "react-redux";
import { View, Image, Video } from "@tarojs/components";
import Taro from "@tarojs/taro";
import useActions from "@/hooks/useActions";
import mediaInfoActions from "@/redux/actions/mediaInfo";
import Utils from "@/utils";

import "./index.less";

interface IShowerVideoParam {
  strUrlVideo?: string;
  strUrlVideoThumbnail?: string;
}

export default function ShowerVideo(props: IShowerVideoParam) {
  const { strUrlVideo = "", strUrlVideoThumbnail = "" } = props;

  const { strPlayingMediaId } = useSelector((state) => state.mediaInfo);

  const videoId = useRef<string>("none");

  const { setPlayingMediaId } = useActions(mediaInfoActions);

  useEffect(() => {
    videoId.current = Utils.UUID();
  }, []);

  const hanldeVideoThumbnailClick = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    setPlayingMediaId(id);
  };

  const handleVideoEnded = () => {
    setPlayingMediaId("");
  };

  return (
    <View className={`showr-video-wrap`}>
      {strPlayingMediaId === videoId.current ? (
        <Video
          id={videoId.current}
          className="showr-video-real"
          src={strUrlVideo}
          autoplay
          showMuteBtn
          muted
          poster={strUrlVideoThumbnail}
          onEnded={handleVideoEnded}
        />
      ) : (
        <Image
          className="showr-video-thumbnail"
          src={strUrlVideoThumbnail}
          mode="widthFix"
          onClick={(e) => hanldeVideoThumbnailClick(e, videoId.current)}
        >
          <View className="flex-center-v showr-video-thumbnail-icon">
            <View className="iconfont iconplay_fill showr-video-thumbnail-icon-text" />
          </View>
        </Image>
      )}
    </View>
  );
}
