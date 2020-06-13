import React, { Component } from "react";
import Flag, { FlagGroup, AutoDismissFlag } from "@atlaskit/flag";
import SuccessIcon from "@atlaskit/icon/glyph/check-circle";
import EditorWarningIcon from "@atlaskit/icon/glyph/editor/warning";
import { colors } from "@atlaskit/theme";

export default class ShowFlag extends Component {
  render() {
    return (
      <div>
        <FlagGroup onDismissed={this.props.onFlagDismissed}>
          <AutoDismissFlag
            title={this.props.title}
            icon={
              this.props.icon === "success" ? (
                <SuccessIcon primaryColor={colors.G300} label="Info" />
              ) : (
                <EditorWarningIcon primaryColor={colors.R500} label="Info" />
              )
            }
            id="1"
            key="1"
          />
        </FlagGroup>
      </div>
    );
  }
}
