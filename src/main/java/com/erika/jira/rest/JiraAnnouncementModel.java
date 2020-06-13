package com.erika.jira.rest;

import java.util.Date;

import javax.xml.bind.annotation.*;

@XmlRootElement(name = "announcement")
@XmlAccessorType(XmlAccessType.FIELD)
public class JiraAnnouncementModel {

	@XmlElement(name = "id")
    private int id;
	
	@XmlElement(name = "title")
    private String title;

    @XmlElement(name = "type")
    private String type;

    @XmlElement(name = "messageType")
    private String messageType;

    @XmlElement(name = "message")
    private String message;

    @XmlElement(name = "startDate")
    private Date startDate;

    @XmlElement(name = "endDate")
    private Date endDate;

    @XmlElement(name = "frequency")
    private String frequency;

    @XmlElement(name = "frequencyCount")
    private int frequencyCount;

    @XmlElement(name = "status")
    private Boolean status;

    @XmlElement(name = "userReply")
    private Boolean userReply;

    @XmlElement(name = "userReplyEmail")
    private String userReplyEmail;

    @XmlElement(name = "doNotRemind")
    private Boolean doNotRemind;
    
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

    public String getTitle() {
        return this.title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessageType() {
        return this.messageType;
    }

    public void setMessageType(String messageType) {
        this.messageType = messageType;
    }

    public String getMessage() {
        return this.message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Date getStartDate() {
        return this.startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return this.endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getFrequency() {
        return this.frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    public int getFrequencyCount() {
        return this.frequencyCount;
    }

    public void setFrequencyCount(int frequencyCount) {
        this.frequencyCount = frequencyCount;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Boolean getUserReply() {
        return this.userReply;
    }

    public void setUserReply(Boolean userReply) {
        this.userReply = userReply;
    }

    public String getUserReplyEmail() {
        return this.userReplyEmail;
    }

    public void setUserReplyEmail(String userReplyEmail) {
        this.userReplyEmail = userReplyEmail;
    }

    public Boolean getDoNotRemind() {
        return this.doNotRemind;
    }

    public void setDoNotRemind(Boolean doNotRemind) {
        this.doNotRemind = doNotRemind;
    }

    public JiraAnnouncementModel() {
    }

    public JiraAnnouncementModel(int id,String title, String type, String messageType, String message, Date startDate,
            Date endDate, String frequency, int frequencyCount, Boolean status, Boolean userReply,
            String userReplyEmail, Boolean doNotRemind) {
    	this.id = id;
        this.title = title;
        this.type = type;
        this.messageType = messageType;
        this.message = message;
        this.startDate = startDate;
        this.endDate = endDate;
        this.frequency = frequency;
        this.frequencyCount = frequencyCount;
        this.status = status;
        this.userReply = userReply;
        this.userReplyEmail = userReplyEmail;
        this.doNotRemind = doNotRemind;
    }

}