package it.com.erika.jira.rest;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;
import static org.junit.Assert.*;
import com.erika.jira.rest.JiraUserPrefModel;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;

public class JiraUserPrefFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/jirauserpref/1.0/message";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);

        JiraUserPrefModel message = resource.get(JiraUserPrefModel.class);

        assertEquals("wrong message","Hello World",message.getMessage());
    }
}
