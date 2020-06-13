package it.com.erika.jira.rest;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;
import static org.junit.Assert.*;
import com.erika.jira.rest.JiraAnnouncementModel;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;

public class JiraAnnouncementFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/jiraannouncement/1.0/message";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);

        JiraAnnouncementModel message = resource.get(JiraAnnouncementModel.class);

        assertEquals("wrong message","Hello World",message.getMessage());
    }
}
