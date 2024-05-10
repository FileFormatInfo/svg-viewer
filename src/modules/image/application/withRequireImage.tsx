import { Component, ComponentType } from "react";

import { IRequireImageProps, RequireImage } from "./RequireImage";

export function withRequireImage<Props>(
  Wrapper: ComponentType<Props>,
  props?: Omit<IRequireImageProps, "children">
) {
  return class extends Component<Props> {
    render() {
      return (
        <RequireImage to={props?.to}>
          <Wrapper {...this.props} />
        </RequireImage>
      );
    }
  };
}
