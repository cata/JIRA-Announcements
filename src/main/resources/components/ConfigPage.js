import React, { Component } from "react";
import HeaderMessage from "../components/HeaderMessage";
import AddAnnouncement from "../components/AddAnnouncement";
import EditorTest from "./EditorTest";

export default class ConfigPage extends Component {
  render() {
    return (
      <div>
        <HeaderMessage />
        <AddAnnouncement />
        <EditorTest />
      </div>
    );
  }
}
