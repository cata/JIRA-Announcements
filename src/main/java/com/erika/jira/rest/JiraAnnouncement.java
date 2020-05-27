package com.erika.jira.rest;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugin.spring.scanner.annotation.component.Scanned;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.atlassian.sal.api.transaction.TransactionCallback;
import com.erika.jira.entity.Announcement;

import net.java.ao.DBParam;
import net.java.ao.Query;
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
            return getAnnouncements();
        } catch (Exception e) {
            System.out.println("Unable to get announcements");
            e.printStackTrace();
            return Response.serverError().entity(e.getMessage()).build();
        }
    }

    public Response getAnnouncements() throws Exception {
        try {
            Announcement[] announcements = (Announcement[]) JiraAnnouncement.this.ao.find(Announcement.class,
                    Query.select());
            if (announcements != null && announcements.length > 0) {
                Announcement announcement = announcements[0];
                return Response.ok(new JiraAnnouncementModel(announcement.getTitle())).build();
            } else {
                return Response.noContent().build();
            }
        } catch (Exception e) {
            throw e;
        }
    }
}