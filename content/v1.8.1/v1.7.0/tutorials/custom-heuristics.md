---
title: "Custom Heuristics"
metaTitle: "Custom Heuristics"
metaDescription: "How to extend the heuristics service with you own algorithm"
---

We use the term heuristics for simple and robust algorithms used for detecting issues such as high CPU or click rage. Here we'll use one example to understand how heuristics work and how to create your own detector and see its results on the DevTools.

## Templates

A template for the heuristics is located in the path `openreplay/backend/pkg/handlers/custom`.

```tsx
package custom

import . "openreplay/backend/pkg/messages"

type CustomHandler struct {
	lastTimestamp uint64
}

func (h *CustomHandler) Handle(message Message, messageID uint64, timestamp uint64) Message {
	h.lastTimestamp = timestamp
	return nil
}

func (h *CustomHandler) Build() Message {
	return nil
}
```

When the heuristic method is created it can be added by modifying the file `main.go` in the path
`openreplay/backend/cmd/heuristics` by importing the costum module and adding the custom function into the message processor handler.
```tsx
package main

import (
        "log"
        "openreplay/backend/internal/config/heuristics"
        "openreplay/backend/pkg/handlers"
        web2 "openreplay/backend/pkg/handlers/web"
        "openreplay/backend/pkg/intervals"
        logger "openreplay/backend/pkg/log"
        "openreplay/backend/pkg/messages"
        "openreplay/backend/pkg/queue"
        "openreplay/backend/pkg/queue/types"
        "openreplay/backend/pkg/sessions"
        "os"
        "os/signal"
        "syscall"
        "time"
        // Import custom modules here
)

func main() {
        log.SetFlags(log.LstdFlags | log.LUTC | log.Llongfile)

        // Load service configuration
        cfg := heuristics.New()

        // HandlersFabric returns the list of message handlers we want to be applied to each incoming message.
        handlersFabric := func() []handlers.MessageProcessor {
                return []handlers.MessageProcessor{
                        // web handlers
                        &web2.ClickRageDetector{},
                        &web2.CpuIssueDetector{},
                        &web2.DeadClickDetector{},
                        &web2.MemoryIssueDetector{},
                        &web2.NetworkIssueDetector{},
                        &web2.PerformanceAggregator{},
                        // Add custom handlers here
                }
        }
        ...
}
```

## Quick Return Example

For this example, we will create the **Quick Return** heuristic, which will send a signal everytime we return to the same url within less than five seconds. The method implemented to detect such event will be taking advantage of the events `SetPageLocation` and `MouseClick`. Everytime we have a mouse click we update the current timestamp and if a `SetPageEvent` message is received within the five next seconds pointing the current webpage, then we return a QuickReturn event.

To get started, let's create the file `quickreturn.go` in the path `openreplay/backend/pkg/handlers/custom` containing the code shown below

```go
package custom
import (
    "log"
    "encoding/json"
    . "openreplay/backend/pkg/messages"
)
type QuickReturnDetector struct {
    timestamp   uint64
    currentPage string
    lastPage    string
}

type CustomPayload struct {
        Timestamp   uint64 `json:"timestamp"`
        CurrentPage string `json:"current_page"`
}

// If received SetPageLocation on same 
func (h *QuickReturnDetector) HandleSetPageLocation(msg *SetPageLocation, messageID uint64, timestamp uint64) Message {
    if (h.timestamp + 5000 >= msg.NavigationStart && h.lastPage == msg.URL) {
        h.timestamp = msg.NavigationStart
        return h.Build()
    }
    h.lastPage = h.currentPage
    h.currentPage = msg.URL
    h.timestamp = msg.NavigationStart
    return nil
}
// detect when a button is clicked (selector must have string 'button' in it)
func (h *QuickReturnDetector) HandleMouseClick(msg *MouseClick, messageID uint64, timestamp uint64) {
    h.timestamp = timestamp
}
func (h *QuickReturnDetector) Handle(message Message, messageID uint64, timestamp uint64) Message {
    switch msg := message.(type) {
    case *SetPageLocation:
        if msg.NavigationStart != 0 {
            return h.HandleSetPageLocation(msg, messageID, timestamp)
        }
    case *MouseClick:
        h.HandleMouseClick(msg, messageID, timestamp)
    }
    return nil
}
func (h *QuickReturnDetector) Build() Message {
    payload := &CustomPayload{
        CurrentPage: h.currentPage,
        Timestamp: h.timestamp,
    }
    payloadData, err := json.Marshal(payload)
    if err != nil {
            log.Println("JSON encoding error", err)
            return nil
    }
    payloadString := string(payloadData)
    event := &CustomEvent {
        MessageID: 122,
        Timestamp: h.timestamp,
        Name:      "quickreturn",
        Payload:   payloadString,
    }
    return event
}
```

Now the heuristic is created, it only needs to be enabled. In order to do so, we have to add the heuristic to the file `main.go` in the path `openreplay/backend/cmd/heuristics` as follows:

```tsx
package main

import (
        "log"
        "openreplay/backend/internal/config/heuristics"
        "openreplay/backend/pkg/handlers"
        web2 "openreplay/backend/pkg/handlers/web"
        "openreplay/backend/pkg/intervals"
        logger "openreplay/backend/pkg/log"
        "openreplay/backend/pkg/messages"
        "openreplay/backend/pkg/queue"
        "openreplay/backend/pkg/queue/types"
        "openreplay/backend/pkg/sessions"
        "os"
        "os/signal"
        "syscall"
        "time"
        // Add custom module
        custom "openreplay/backend/pkg/custom"
)

func main() {
        log.SetFlags(log.LstdFlags | log.LUTC | log.Llongfile)

        // Load service configuration
        cfg := heuristics.New()

        // HandlersFabric returns the list of message handlers we want to be applied to each incoming message.
        handlersFabric := func() []handlers.MessageProcessor {
                return []handlers.MessageProcessor{
                        // web handlers
                        &web2.ClickRageDetector{},
                        &web2.CpuIssueDetector{},
                        &web2.DeadClickDetector{},
                        &web2.MemoryIssueDetector{},
                        &web2.NetworkIssueDetector{},

                        // The new handler
                        &custom.QuickReturnDetector{},
                }
        }
        ...
}
```

The heuristic is now available and the messages are sent as a **Custom Event**. 
Note that you'll need to re-deploy your back-end before being able to take advantage of the new heuristic. To do so, follow the steps in *build and deploy* section from the [**deploy from source**](https://docs.openreplay.com/deployment/deploy-source) page.

## Making use of the custom event
Now that you have your custom heuristic sending a new custom event, the next thing  you have to do, is to use the event somehow.
With the example from before, you have two options:

1. You can filter sessions by custom event, makin sure you only list the ones that have that "problem" (in our case, the quick return issue).
2. You can find the event inside the Events tab in the DevTools section of the player. That way you can pinpoint the exact moment when the event is triggered.

### Filtering sessions by custom event

To filter sessions by your new custom event, simply use the [Omnisearch](/tutorials/omnisearch) feature, clicking on the search bar, and selecting "Custom Events" as the filter type.
Once done, you'll be able to enter the name of the event, it should autocomplete the name once you start typing, as you can see in the image below:

![Custom event filter](/images/heuristics/custom-events.png)

**Note** that if the autocomplete doesn't work or it doesn't return the event name you're looking for, then there is no event named like that in the database. In this case, you should double check your logic to make sure you're correctly triggering the sending of the custom event.

### Finding the custom event on the DevTools

If you want to understand exactly when the custom event is triggered, then you'll have to replay a session and click on the "Events" tab of the DevTools.
You'll find it located on the lower right corner of the screen.
Once clicked, it'll open and you'll see the list of events, including your custom one, as seen in the image below:

![Events listed in devTools](/images/heuristics/devtools.png)

In this simple process we have created a new detector. Of course, your algorithm can be more sophisticated and include a combination of different type of events.

## Do you have questions?

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.