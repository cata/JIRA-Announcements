import React from "react";
import Button from "@atlaskit/button";
import EditIcon from "@atlaskit/icon/glyph/edit-filled";
import VidIcon from "@atlaskit/icon/glyph/vid-play";
import RefreshIcon from "@atlaskit/icon/glyph/refresh";
import TrashIcon from "@atlaskit/icon/glyph/trash";
import DynamicTable from "@atlaskit/dynamic-table";
import axios from "axios";
import Swal from "sweetalert2";
import "animate.css";
// ES6

import AnnouncementConfigDialog from "./AnnouncementConfigDialog";
import ShowFlag from "./ShowFlag";

class Dynamic extends React.Component {
  markup(val) {
    return { __html: val };
  }

  render() {
    return <div dangerouslySetInnerHTML={this.markup(this.props.html)} />;
  }
}

class TimeFormat extends React.Component {
  markup(val) {
    return { __html: val };
  }

  render() {
    const formatedDate =
      new Date(this.props.date).toString().split(":")[0] +
      ":" +
      new Date(this.props.date).toString().split(":")[1]; // DAY Month date year HH:MM
    return <span>{formatedDate}</span>;
  }
}

class AddAnnouncement extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      editModelOpen: false,
      head: {
        cells: [
          {
            key: "name",
            name: "announcementTitle",
            content: "Title",
            isSortable: true,
          },
          { key: "type", name: "type", content: "Type" },
          { key: "messageType", name: "messageType", content: "Message Type" },
          {
            key: "announcementMessage",
            name: "announcementMessage",
            content: "Announcement Message",
          },
          { key: "startDate", name: "startDate", content: "Start Date" },
          { key: "endDate", name: "endDate", content: "End Date" },
          { key: "frequency", name: "frequency", content: "Frequency" },
          { key: "count", name: "count", content: "Count" },
          { key: "status", name: "status", content: "Status" },
          ,
          {
            key: "allowUserToReply",
            name: "allowUserToReply",
            content: "User Reply",
          },
          {
            key: "announcementContact",
            name: "announcementContact",
            content: "Announcement Contact",
          },
          {
            key: "actions",
            name: "actions",
            content: "Actions",
          },
        ],
      },
      tableHead: {
        cells: [
          {
            key: "name",
            name: "announcementTitle",
            content: "Title",
            isSortable: true,
          },
          { key: "type", name: "type", content: "Type" },
          { key: "messageType", name: "messageType", content: "Message Type" },
          {
            key: "announcementMessage",
            name: "announcementMessage",
            content: "Announcement Message",
          },
          { key: "status", name: "status", content: "Status" },
          {
            key: "actions",
            name: "actions",
            content: "Actions",
          },
        ],
      },
      editInformations: false,
      caption: "Announcements",
      rows: [],
      tableRows: [],
      showFlag: false,
      flagTitle: "",
      flagIcon: "",
    };
    this.handleAnnouncementClick = this.handleAnnouncementClick.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.saveModal = this.saveModal.bind(this);
    this.deleteThisItem = this.deleteThisItem.bind(this);
    this.editSaveModal = this.editSaveModal.bind(this);
    this.onFlagDismissed = this.onFlagDismissed.bind(this);
  }

  onFlagDismissed() {
    this.setState({ showFlag: false });
  }

  handleAnnouncementClick(event) {
    this.setState({
      modalOpen: true,
    });
  }

  closeModal() {
    this.setState({
      modalOpen: false,
      editModelOpen: false,
    });
  }

  deleteThisItem(thisItemIndex) {
    // if (!window.confirm("Please confirm")) return false;
    // var array = [...this.state.rows]; // make a separate copy of the array
    // var index = false;
    // array.forEach(function (item, itemIndex) {
    //   index = item.indexKey === thisItemIndex ? itemIndex : index;
    // });
    // if (index !== false) {
    //   array.splice(index, 1);
    //   this.setState({ rows: array });
    // }
    axios
      .post(
        "/jira/rest/jiraannouncement/1.0/announcement/deleteannouncement",
        null,
        {
          params: {
            id: thisItemIndex,
          },
        }
      )
      .then((response) => {
        this.getAllAnnouncements();
        this.setState({
          flagIcon: "success",
          flagTitle: "Success",
          showFlag: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          flagIcon: "error",
          flagTitle: error.response.data,
          showFlag: true,
        });
      });
  }

  editThisItem(thisItemIndex) {
    var array = [...this.state.rows]; // make a separate copy of the array
    var index = false;
    array.forEach(function (item, itemIndex) {
      index = item.indexKey === thisItemIndex ? itemIndex : index;
    });
    var currentData = {};
    array[index].cells.forEach(function (item) {
      currentData[item.name] = item.content;
    });
    currentData["editKey"] = array[index].indexKey;
    this.setState(
      {
        editInformations: currentData,
      },
      function () {
        this.setState({
          editModelOpen: true,
        });
      }
    );
  }

  //INPROGRESS:
  previewThisItem(thisItemIndex) {
    var array = [...this.state.rows]; // make a separate copy of the array
    var index = false;
    array.forEach(function (item, itemIndex) {
      index = item.indexKey === thisItemIndex ? itemIndex : index;
    });
    var currentData = {};
    array[index].cells.forEach(function (item) {
      currentData[item.name] = item.content;
    });
    currentData["editKey"] = array[index].indexKey;
    console.log(currentData.allowUserToReply);
    Swal.fire({
      showClass: {
        popup: "animate__animated animate__fadeInDown",
      },
      allowOutsideClick: false,
      allowEscapeKey: false,
      padding: "1px",
      position: "top",
      title: currentData.announcementTitle,
      icon: currentData.type.toLowerCase(),
      html: currentData.announcementMessage.props.html,
      input: currentData.allowUserToReply === "Allowed" ? "checkbox" : "",
      inputValue: 0,
      inputPlaceholder: "Do Not Remind Me",
      confirmButtonColor: "#0747a6",
      confirmButtonText: "Ok",
      footer:
        '<a href="mailto:' +
        currentData.announcementContact +
        '" id="some-action">Contact Us</a>',
    }).then(function (result) {
      if (result.value) {
        Swal.fire({
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          position: "top",
          title: "Thank You!",
          text: "You will not be notified again",
          icon: "success",
          confirmButtonColor: "#0747a6",
          confirmButtonText: "Ok",
        });
      } else if (result.value === 0) {
        Swal.fire({
          hideClass: {
            popup: "animate__animated animate__fadeOutUp",
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          position: "top",
          title: "Thank You!",
          text: "You will not be notified till next session",
          icon: "success",
          confirmButtonColor: "#0747a6",
          confirmButtonText: "Ok",
        });
      } else {
        console.log(`modal was dismissed by ${result.dismiss}`);
      }
    });
  }

  editSaveModal(data) {
    // var uniqueIndex = data.editKey;
    // var rowItem = this.getSavedDataObject(data, uniqueIndex);
    // var array = [...this.state.rows]; // make a separate copy of the array
    // var index = false;
    // array.forEach(function (item, itemIndex) {
    //   index = item.indexKey === uniqueIndex ? itemIndex : index;
    // });
    // array.splice(index, 1);
    // array.splice(index, 0, { cells: rowItem, indexKey: uniqueIndex });
    // this.setState({ rows: array });
    console.log(data.announcementContact);
    axios
      .post(
        "/jira/rest/jiraannouncement/1.0/announcement/updateannouncement",
        null,
        {
          params: {
            id: data.editKey,
            title: data.announcementTitle,
            type: data.type,
            messageType: data.messageType,
            message: data.announcementMessage,
            startDate: new Date(data.startDate).getTime(),
            endDate: new Date(data.endDate).getTime(),
            status: data.status,
            doNotRemind: true,
            userReply: data.allowUserToReply,
            userReplyEmail: data.announcementContact,
            frequency: data.frequency,
            frequencyCount: data.count,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.getAllAnnouncements();
        this.setState({
          flagIcon: "success",
          flagTitle: "Success",
          showFlag: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          flagIcon: "error",
          flagTitle: error.response.data,
          showFlag: true,
        });
      });
  }

  //INPROGRESS:
  componentDidMount() {
    this.getAllAnnouncements();
  }

  //INPROGRESS:
  getAllAnnouncements() {
    axios
      .get("/jira/rest/jiraannouncement/1.0/announcement/activeannouncements")
      .then((response) => {
        if (response.data !== "") {
          let rows = this.constructRows(response.data);
          let tableRows = this.constructTableRows(response.data);
          this.setState({ rows: rows, tableRows: tableRows });
        } else {
          this.setState({ rows: [], tableRows: [] });
        }
      })
      .catch((error) => console.log(error));
  }

  //INPROGRESS:
  constructRows(data) {
    var rows = [];
    var _this = this;
    data.forEach(function (data) {
      var rowItem = [];
      _this.state.head.cells.forEach(function (head) {
        var value = "";
        if (head.name === "actions") {
          value = (
            <div>
              <span title="Edit" onClick={() => _this.editThisItem(data.id)}>
                <EditIcon />
              </span>
              <span
                title="Preview"
                onClick={() => _this.previewThisItem(data.id)}
              >
                <VidIcon />
              </span>
              <span title="Reset">
                <RefreshIcon />
              </span>
              <span
                title="Delete"
                onClick={() => _this.deleteThisItem(data.id)}
              >
                <TrashIcon />
              </span>
            </div>
          );
        } else if (head.name === "announcementTitle") {
          value = data.title;
        } else if (head.name === "type") {
          value = data.type;
        } else if (head.name === "messageType") {
          value = data.messageType;
        } else if (head.name === "announcementMessage") {
          value = <Dynamic html={data.message} />;
        } else if (head.name === "startDate") {
          value = <TimeFormat date={data.startDate} />;
        } else if (head.name === "endDate") {
          value = <TimeFormat date={data.endDate} />;
        } else if (head.name === "frequency") {
          value = data.frequency;
        } else if (head.name === "count") {
          value = data.frequencyCount;
        } else if (head.name === "status") {
          value = data.status ? "Enabled" : "Disabled";
        } else if (head.name === "allowUserToReply") {
          value = data.userReply ? "Allowed" : "Not Allowed";
        } else if (head.name === "announcementContact") {
          value = data.userReplyEmail;
        }
        var pushObject = { content: value, name: head.name };
        rowItem.push(pushObject);
      });
      rows.push({ cells: rowItem, indexKey: data.id });
    });
    return rows;
  }

  //INPROGRESS:
  constructTableRows(data) {
    var rows = [];
    var _this = this;
    data.forEach(function (data) {
      var rowItem = [];
      _this.state.tableHead.cells.forEach(function (head) {
        var value = "";
        if (head.name === "actions") {
          value = (
            <div>
              <span title="Edit" onClick={() => _this.editThisItem(data.id)}>
                <EditIcon />
              </span>
              <span
                title="Preview"
                onClick={() => _this.previewThisItem(data.id)}
              >
                <VidIcon />
              </span>
              <span title="Reset">
                <RefreshIcon />
              </span>
              <span
                title="Delete"
                onClick={() => _this.deleteThisItem(data.id)}
              >
                <TrashIcon />
              </span>
            </div>
          );
        } else if (head.name === "announcementTitle") {
          value = data.title;
        } else if (head.name === "type") {
          value = data.type;
        } else if (head.name === "messageType") {
          value = data.messageType;
        } else if (head.name === "announcementMessage") {
          value = <Dynamic html={data.message} />;
        } else if (head.name === "status") {
          value = data.status ? "Enabled" : "Disabled";
        }
        var pushObject = { content: value, name: head.name };
        rowItem.push(pushObject);
      });
      rows.push({ cells: rowItem, indexKey: data.id });
    });
    return rows;
  }

  //INPROGRESS:
  saveModal(data) {
    // // console.log(data);
    // // var uniqueIndex = data.announcementTitle + "_" + this.state.rows.length + 1;
    // // var rowItem = this.getSavedDataObject(data, uniqueIndex);
    // // var joined = this.state.rows.concat([
    // //   { cells: rowItem, indexKey: uniqueIndex },
    // // ]);
    // // console.log(joined);
    // this.setState({ rows: joined });
    console.log(data.announcementContact);
    axios
      .post(
        "/jira/rest/jiraannouncement/1.0/announcement/saveannouncement",
        null,
        {
          params: {
            title: data.announcementTitle,
            type: data.type,
            messageType: data.messageType,
            message: data.announcementMessage,
            startDate: new Date(data.startDate).getTime(),
            endDate: new Date(data.endDate).getTime(),
            status: data.status,
            doNotRemind: true,
            userReply: data.allowUserToReply,
            userReplyEmail: data.announcementContact,
            frequency: data.frequency,
            frequencyCount: data.count,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.getAllAnnouncements();
        this.setState({
          flagIcon: "success",
          flagTitle: "Success",
          showFlag: true,
        });
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          flagIcon: "error",
          flagTitle: error.response.data,
          showFlag: true,
        });
      });
  }

  //REMOVE:
  getSavedDataObject(data, uniqueIndex) {
    var rowItem = [];
    var _this = this;
    this.state.head.cells.forEach(function (head) {
      var value = "";
      if (head.name === "actions") {
        value = (
          <div>
            <span title="Edit" onClick={() => _this.editThisItem(uniqueIndex)}>
              <EditIcon />
            </span>
            <span title="Preview">
              <VidIcon />
            </span>
            <span title="Reset">
              <RefreshIcon />
            </span>
            <span
              title="Delete"
              onClick={() => _this.deleteThisItem(uniqueIndex)}
            >
              <TrashIcon />
            </span>
          </div>
        );
      } else
        Object.keys(data).forEach(function (key) {
          if (key === head.name) {
            if (key === "announcementMessage") {
              value = data[key];
              value = <Dynamic html={value} />;
            } else if (key === "startDate" || key === "endDate") {
              value = <TimeFormat date={data[key]} />;
            } else
              value =
                key !== "status"
                  ? key !== "allowUserToReply"
                    ? data[key]
                    : data[key]
                    ? "Allowed"
                    : "Not allowed"
                  : data[key]
                  ? "Enabled"
                  : "Disabled";
          }
        });
      var pushObject = { content: value, name: head.name };
      rowItem.push(pushObject);
    });
    return rowItem;
  }

  render() {
    return (
      <div className="App" style={{ padding: "10px" }}>
        <Button onClick={this.handleAnnouncementClick} appearance={"default"}>
          <span>Add announcement</span>
        </Button>

        {this.state.rows.length > 0 && (
          <DynamicTable
            caption={this.state.caption}
            head={this.state.tableHead}
            rows={this.state.tableRows}
            rowsPerPage={10}
            defaultPage={1}
            loadingSpinnerSize="large"
            isLoading={false}
            isFixedSize
            defaultSortKey="name"
            defaultSortOrder="ASC"
            onSort={() => null}
            onSetPage={() => null}
          />
        )}
        {this.state.modalOpen && (
          <AnnouncementConfigDialog
            closeModal={this.closeModal}
            saveModal={this.saveModal}
            heading={"New Announcement"}
          />
        )}
        {this.state.editModelOpen && (
          <AnnouncementConfigDialog
            closeModal={this.closeModal}
            saveModal={this.editSaveModal}
            heading={"Edit Announcement"}
            editInformations={this.state.editInformations}
          />
        )}
        {this.state.showFlag && (
          <ShowFlag
            onFlagDismissed={this.onFlagDismissed}
            title={this.state.flagTitle}
            icon={this.state.flagIcon}
          />
        )}
      </div>
    );
  }
}

export default AddAnnouncement;
