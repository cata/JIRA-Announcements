import React, { Component } from "react";
import { Editor, EditorContext } from "@atlaskit/editor-core";

export default class EditorTest extends Component {
  render() {
    return (
      <div>
        <EditorContext>
          <Editor appearance="comment" />
        </EditorContext>
      </div>
    );
  }
}
