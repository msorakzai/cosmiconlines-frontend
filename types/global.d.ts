import React from "react";

declare global {
  namespace JSX {
    type Element = React.ReactElement<any, any>; // ✅ Fixes JSX.Element redline
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
