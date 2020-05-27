package com.erika.jira.entity;

import java.util.Date;
import net.java.ao.Entity;
import net.java.ao.Accessor;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.Default;
import net.java.ao.schema.PrimaryKey;
import net.java.ao.schema.StringLength;
import net.java.ao.schema.Table;
import net.java.ao.schema.NotNull;

@Table("Announcement")
public interface Announcement extends Entity {

    @Accessor("ID")
    @NotNull
    @PrimaryKey
    @AutoIncrement
    public String getId();

    public void setId(int id);

    @Accessor("TITLE")
    @NotNull
    public String getTitle();

    public void setTitle(String title);

    @Accessor("TYPE")
    @NotNull
    public String getType();

    public void setType(String type);

    @Accessor("MESSAGETYPE")
    @NotNull
    public String getMessagetype();

    public void setMessagetype(String meesagetype);

    @Accessor("ANNOUNCEMENT")
    @StringLength(StringLength.UNLIMITED)
    @NotNull
    public String getAnnouncement();

    public void setAnnouncement(String announcement);

    @Accessor("CONTACT")
    @Default("None")
    public String getContact();

    public void setContact(String contact);

    @Accessor("FREQUENCY")
    @NotNull
    public String getFrequency();

    public void setFrequency(String frequency);

    @Accessor("ENABLED")
    @NotNull
    @Default("false")
    public Boolean getEnabled();

    public void setEnabled(Boolean enabled);

    @Accessor("STARTDATE")
    @NotNull
    public Date getStartdate();

    public void setStartdate(Date startdate);

    @Accessor("ENDDATE")
    @NotNull
    public Date getEnddate();

    public void setEnddate(Date enddate);

    @Accessor("DONTREMIND")
    @NotNull
    @Default("false")
    public Boolean getDontremind();

    public void setDontremind(Boolean dontremind);

    @Accessor("CREATED")
    @NotNull
    public Date getCreated();

    public void setCreated(Date created);

}
