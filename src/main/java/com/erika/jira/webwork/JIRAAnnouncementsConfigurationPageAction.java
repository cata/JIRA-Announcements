package com.erika.jira.webwork;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.atlassian.jira.web.action.JiraWebActionSupport;
import com.atlassian.jira.component.ComponentAccessor;

public class JIRAAnnouncementsConfigurationPageAction extends JiraWebActionSupport {
    /**
     *
     */
    private static final long serialVersionUID = 7857306536962789570L;
    private static final Logger log = LoggerFactory.getLogger(JIRAAnnouncementsConfigurationPageAction.class);

    @Override
    public String execute() throws Exception {
        return super.execute(); // returns SUCCESS
    }
}
