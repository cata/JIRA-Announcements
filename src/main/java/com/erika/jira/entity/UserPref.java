package com.erika.jira.entity;

import net.java.ao.Entity;
import net.java.ao.Accessor;
import net.java.ao.schema.AutoIncrement;
import net.java.ao.schema.PrimaryKey;
import net.java.ao.schema.Table;
import net.java.ao.schema.NotNull;

@Table("USERPREF")
public interface UserPref extends Entity {

    @Accessor("ID")
    @NotNull
    @PrimaryKey
    @AutoIncrement
    public String getId();

    public void setId(int id);

    @Accessor("USERNAME")
    @NotNull
    public String getUsername();

    public void setUsername(String username);

    @Accessor("TITLEID")
    @NotNull
    public int getTitleid();

    public void setTitleid(int titleid);
}