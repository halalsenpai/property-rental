import { Badge } from "antd";
import React, { Children } from "react";

export const CustomTag = (props) => {
  const { tagType } = props;

  return <Badge text={tagType} />;
};
