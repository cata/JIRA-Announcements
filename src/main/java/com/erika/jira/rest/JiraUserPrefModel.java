package com.erika.jira.rest;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class JiraUserPrefModel {

    @XmlElement(name = "value")
    private String message;

    public JiraUserPrefModel() {
    }

    public JiraUserPrefModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}