package com.erika.jira.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.atlassian.sal.api.transaction.TransactionCallback;
import com.erika.jira.entity.Announcement;

import net.java.ao.DBParam;
import net.java.ao.Query;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * A resource of message.
 */
@Scanned
@Path("/announcement")
public class JiraAnnouncement {

    @ComponentImport
    private final ActiveObjects ao;

    public JiraAnnouncement(@ComponentImport ActiveObjects ao) {
        this.ao = ao;
    }

    @GET
    @Path("activeannouncements")
    @AnonymousAllowed
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response getActiveAnnouncements() {
        try {
            Announcement[] announcements = ao.executeInTransaction(new TransactionCallback<Announcement[]>() {
                public Announcement[] doInTransaction() {
                    Announcement[] announcements = (Announcement[]) ao.find(Announcement.class, Query.select());
                    return announcements;
                }
            });
            if (announcements != null && announcements.length > 0) {
                List<JiraAnnouncementModel> announcementsList = new ArrayList<>();
                for (int i = 0; i < announcements.length; i++) {
                    Announcement announcement = announcements[i];
                    announcementsList.add(new JiraAnnouncementModel(announcement.getID(), announcement.getTitle(),
                            announcement.getType(), announcement.getMessagetype(), announcement.getAnnouncement(),
                            announcement.getStartdate(), announcement.getEnddate(), announcement.getFrequency(),
                            announcement.getFrequencycount(), announcement.getEnabled(), announcement.getUserreply(),
                            announcement.getContact(), announcement.getDontremind()));
                }
                return Response.ok(announcementsList).build();
            } else {
                return Response.ok().build();
            }
        } catch (Exception e) {
            System.out.println("Unable to get announcements");
            System.out.println(e.getMessage());
            ;
            return Response.serverError().entity(e.getMessage()).build();
        }
    }

    @POST
    @Path("saveannouncement")
    @AnonymousAllowed
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response saveAnnouncement(@FormParam("title") String title, @FormParam("type") String type,
            @FormParam("messageType") String messageType, @FormParam("message") String message,
            @FormParam("startDate") Long startDate, @FormParam("endDate") Long endDate,
            @FormParam("frequency") String frequency, @FormParam("frequencyCount") int frequencyCount,
            @FormParam("status") boolean status, @FormParam("userReply") boolean userReply,
            @FormParam("userReplyEmail") String userReplyEmail, @FormParam("doNotRemind") boolean doNotRemind) {
        try {
            System.out.println(userReplyEmail);
            Announcement announcement = saveAnnouncements(title, type, messageType, message, startDate, endDate,
                    frequency, frequencyCount, status, userReply, userReplyEmail, doNotRemind);
            return Response.ok(new JiraAnnouncementModel(announcement.getID(), announcement.getTitle(),
                    announcement.getType(), announcement.getMessagetype(), announcement.getAnnouncement(),
                    announcement.getStartdate(), announcement.getEnddate(), announcement.getFrequency(),
                    announcement.getFrequencycount(), announcement.getEnabled(), announcement.getUserreply(),
                    announcement.getContact(), announcement.getDontremind())).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(409).entity(e.getMessage()).build();
        }
    }

    public Announcement saveAnnouncements(String title, String type, String messageType, String message, Long startDate,
            Long endDate, String frequency, int frequencyCount, boolean enabled, boolean userReply,
            String userReplyEmail, boolean doNotRemind) {
        try {
            Announcement announcementTransaction = ao.executeInTransaction(new TransactionCallback<Announcement>() {
                public Announcement doInTransaction() {
                    Announcement[] announcment = (Announcement[]) ao.find(Announcement.class,
                            Query.select().where("TITLE=?", title));
                    if (announcment.length == 0) {
                        java.util.Date today = new java.util.Date();
                        java.util.Date startDateTime = new java.util.Date(startDate);
                        java.util.Date endDateTime = new java.util.Date(endDate);
                        Announcement announcementToBeAdded = (Announcement) ao.create(Announcement.class,
                                new DBParam("TITLE", title), new DBParam("TYPE", type),
                                new DBParam("MESSAGETYPE", messageType), new DBParam("ANNOUNCEMENT", message),
                                new DBParam("STARTDATE", startDateTime), new DBParam("ENDDATE", endDateTime),
                                new DBParam("FREQUENCY", frequency), new DBParam("FREQUENCYCOUNT", frequencyCount),
                                new DBParam("ENABLED", enabled), new DBParam("USERREPLY", userReply),
                                new DBParam("CONTACT", userReplyEmail), new DBParam("DONTREMIND", doNotRemind),
                                new DBParam("CREATED", today));
                        announcementToBeAdded.save();
                        return announcementToBeAdded;
                    } else {
                        throw new IllegalArgumentException("Announcement with same Title already exists!");
                    }
                }
            });
            return announcementTransaction;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @POST
    @Path("updateannouncement")
    @AnonymousAllowed
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response updateAnnouncement(@FormParam("id") int id, @FormParam("title") String title,
            @FormParam("type") String type, @FormParam("messageType") String messageType,
            @FormParam("message") String message, @FormParam("startDate") Long startDate,
            @FormParam("endDate") Long endDate, @FormParam("frequency") String frequency,
            @FormParam("frequencyCount") int frequencyCount, @FormParam("status") boolean status,
            @FormParam("userReply") boolean userReply, @FormParam("userReplyEmail") String userReplyEmail,
            @FormParam("doNotRemind") boolean doNotRemind) {
        try {
            System.out.println(title);
            System.out.println(message);
            System.out.println(endDate);
            System.out.println(userReplyEmail);
            Announcement announcement = UpdateAnnouncementEntry(id, title, type, messageType, message, startDate,
                    endDate, frequency, frequencyCount, status, userReply, userReplyEmail, doNotRemind);
            return Response.ok(new JiraAnnouncementModel(announcement.getID(), announcement.getTitle(),
                    announcement.getType(), announcement.getMessagetype(), announcement.getAnnouncement(),
                    announcement.getStartdate(), announcement.getEnddate(), announcement.getFrequency(),
                    announcement.getFrequencycount(), announcement.getEnabled(), announcement.getUserreply(),
                    announcement.getContact(), announcement.getDontremind())).build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(409).entity(e.getMessage()).build();
        }
    }

    public Announcement UpdateAnnouncementEntry(int id, String title, String type, String messageType, String message,
            Long startDate, Long endDate, String frequency, int frequencyCount, boolean enabled, boolean userReply,
            String userReplyEmail, boolean doNotRemind) {
        try {
            Announcement announcementTransaction = ao.executeInTransaction(new TransactionCallback<Announcement>() {
                public Announcement doInTransaction() {
                    Announcement[] announcment = (Announcement[]) ao.find(Announcement.class,
                            Query.select().where("ID=?", id));
                    if (announcment.length > 0) {
                        java.util.Date today = new java.util.Date();
                        java.util.Date startDateTime = new java.util.Date(startDate);
                        java.util.Date endDateTime = new java.util.Date(endDate);
                        announcment[0].setTitle(title);
                        announcment[0].setType(type);
                        announcment[0].setMessagetype(messageType);
                        announcment[0].setAnnouncement(message);
                        announcment[0].setStartdate(startDateTime);
                        announcment[0].setEnddate(endDateTime);
                        announcment[0].setFrequency(frequency);
                        announcment[0].setFrequencycount(frequencyCount);
                        announcment[0].setEnabled(enabled);
                        announcment[0].setUserreply(userReply);
                        announcment[0].setContact(userReplyEmail);
                        announcment[0].setCreated(today);
                        announcment[0].save();
                        return announcment[0];
                    } else {
                        throw new IllegalArgumentException(
                                "Cannot find the announcement. May be deleted by another user.");
                    }
                }
            });
            return announcementTransaction;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }

    @POST
    @Path("deleteannouncement")
    @AnonymousAllowed
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
    public Response updateAnnouncement(@FormParam("id") int id) {
        try {
            System.out.println("Enter Delete : " + id);
            ao.executeInTransaction(new TransactionCallback<Void>() {
                @Override
                public Void doInTransaction() {
                    Announcement[] announcement = (Announcement[]) ao.find(Announcement.class,
                            Query.select().where("ID=?", id));
                    ao.delete(announcement);
                    return null;
                }
            });
            return Response.ok().build();
        } catch (Exception e) {
            e.printStackTrace();
            return Response.status(409).entity(e.getMessage()).build();
        }
    }

}