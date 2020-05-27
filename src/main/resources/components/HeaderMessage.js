import React, { Component } from "react";
import { BreadcrumbsItem, BreadcrumbsStateless } from "@atlaskit/breadcrumbs";
import PageHeader from "@atlaskit/page-header";
import AnnouncementExplainatory from "../components/AnnouncementExplainatory";

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="JIRA Announcements" key="JIRA Announcements" />
    <BreadcrumbsItem text="Announcements" key="Announcements" />
  </BreadcrumbsStateless>
);

export default class HeaderMessage extends Component {
  render() {
    return (
      <div>
        <PageHeader breadcrumbs={breadcrumbs}>Announcements </PageHeader>
        <AnnouncementExplainatory />
      </div>
    );
  }
}
