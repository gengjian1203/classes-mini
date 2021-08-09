import React, { Fragment, useEffect, useState } from "react";
import usePermission from "@/hooks/usePermission";

import "./index.less";

interface IPermissionParam {
  strCheckTag?: string;
  strCheckCompany?: string;
  strCheckPosition?: string;
  children?: any;
}

export default function Permission(props: IPermissionParam) {
  const {
    strCheckTag = "pass",
    strCheckCompany = "pass",
    strCheckPosition = "pass",
    children,
  } = props;

  const [isShowComponents, setShowComponents] = useState<boolean>(false);

  useEffect(() => {
    let result = usePermission({
      strCheckTag: strCheckTag,
      strCheckCompany: strCheckCompany,
      strCheckPosition: strCheckPosition,
    });
    setShowComponents(result);
  }, [strCheckTag, strCheckCompany, strCheckPosition]);

  return <Fragment>{isShowComponents && children}</Fragment>;
}
