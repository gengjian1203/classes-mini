import React, { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { View, Image, Video } from "@tarojs/components";
import Taro from "@tarojs/taro";
import useActions from "@/hooks/useActions";
import mediaInfoActions from "@/redux/actions/mediaInfo";
import Utils from "@/utils";

import "./index.less";

interface IShowerImagesParam {
  strUrlVideo?: string;
  strUrlVideoThumbnail?: string;
}

export default function ShowerImages(props: IShowerImagesParam) {
  const { strUrlVideo = "", strUrlVideoThumbnail = "" } = props;

  const { strPlayingMediaId } = useSelector((state) => state.mediaInfo);

  const [videoId, setVideoId] = useState<string>("");

  const { setPlayingMediaId } = useActions(mediaInfoActions);

  useEffect(() => {
    const strVideoId = Utils.UUID();
    setVideoId(strVideoId);
  }, []);

  const hanldeImagesClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPlayingMediaId(videoId);
  };

  const handleVideoEnded = () => {
    setPlayingMediaId("");
  };

  return (
    <View className={`showr-video-wrap`}>
      {strPlayingMediaId === videoId ? (
        <Video
          id={videoId}
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
          onClick={hanldeImagesClick}
        />
      )}
    </View>
  );
}
