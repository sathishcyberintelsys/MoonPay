async function onTrack(event, settings) {
  const endpoint = `https://${settings.subdomain}.zendesk.com/api/v2/tickets.json`
  
  if (event.event = "Application Submitted") {
    
    const newTicket = {
      "ticket": {
        "subject":  `Application Review: ${event.properties.display_name}`,
        "comment":  { 
          "body": `Type: ${event.properties.component_type}
                   App ID: ${event.properties.app_name}
                   UserID: ${event.userId}
                   Include steps here for what your Support Team to action on when seeing this application submitted`,
          // This ensures that this is created as in internal note in Zendesk
          "public": false
        },
        "priority": "high",
        "tags": ["application-support"]
      }
    }

    const res = await fetch(endpoint, {
      body: JSON.stringify(newTicket),
      headers: {
        // https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication
        "Authorization": `Basic ${settings.credentials}`,
        "Content-Type": "application/json"
      },
      method: "post"
    })
    
    return res.json()
  } 
}
