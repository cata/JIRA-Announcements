import React, { Component } from "react";
import SectionMessage from "@atlaskit/section-message";

export default class AnnouncementExplainatory extends Component {
  render() {
    return (
      <div>
        <SectionMessage
          title="Welcome to Announcements Configuration Page"
          actions={[
            {
              key: "documentation",
              href: "https://www.google.com",
              text: "Documentation",
            },
          ]}
        >
          <p>Explainatory will be written by the content writer.</p>
        </SectionMessage>
      </div>
    );
  }
}
