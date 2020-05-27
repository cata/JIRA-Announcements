const mappings = new Map();

/**
 * Internal modules - are amd or es6 modules that exist in this source code. This will usually include shims for
 * external libraries that export a global instead of a module.
 */
/**
 * Internal modules - are amd or es6 modules that exist in this source code. This will usually include shims for
 * external libraries that export a global instead of a module.
 */
mappings
    .set("myapp/lib/backbone", {
        dependency: "com.atlassian.auiplugin:ajs-backbone",
        import: {
            "amd": "backbone",
            "var": "require('backbone')"
        }
    })
    .set("myapp/lib/underscore", {
        dependency: "com.atlassian.auiplugin:ajs-underscorejs",
        import: {
            "amd": "underscore",
            "var": "require('underscore')"
        }
    });

/**
 * Fake modules - these are hacks to make authoring simpler while taking advantage of the WRM runtime.
 */
mappings
    .set("myapp/hack/format", {
        // We need an object reference that has a `format` function on it.
        // In older products, the global AJS object is extended by AUI with this function.
        // In more recent versions of the WRM (4.0+), this can be the `wrm/format` module.
        dependency: "com.atlassian.auiplugin:aui-core",
        import: {
            "var": "AJS"
        }
    });

/**
 * External modules - are amd or es6 modules that exist outside this source code. e.g from JIRA or aui. These
 * modules will be required using window.require (which in JIRA land means almond).
 */
mappings
    .set("aui/flag", {
        dependency: ["com.atlassian.auiplugin:aui-flag"],
        import: {
            "amd": "aui/flag",
            "var": "require('aui/flag')" // AJS.flag didn't get defined until AUI 5.9 :lolwut:
        }
    })
    .set("wrm/require", {
        dependency: ["com.atlassian.plugins.atlassian-plugins-webresource-rest:web-resource-manager"],
        import: {
            "amd": "wrm/require",
            "var": "WRM.require"
        }
    })
    .set("wrm/data", {
        dependency: ["com.atlassian.plugins.atlassian-plugins-webresource-plugin:data"],
        import: {
            "amd": "wrm/data",
            "var": "WRM.data"
        }
    })
    .set("wrm/context-path", {
        dependency: ["com.atlassian.plugins.atlassian-plugins-webresource-plugin:context-path"],
        import: {
            "amd": "wrm/context-path",
            "var": "AJS.contextPath"
        }
    });

module.exports = mappings;
