---
title: "Custom Heuristics"
metaTitle: "Custom Heuristics"
metaDescription: "How to extend the heuristics service with you own algorithm"
---

We call heuristics simple and robust algorithms for detecting issues such as high CPU or click rage. Here we'll use one example to understand how heuristics work and how to create your own detector and see its results on the dashboard.

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
`openreplay/backend/cmd/heuristics` by importing the costume module and adding the custom function into the message processor handler.
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

For this example, we will create the Quick Return heuristic, which will send a signal everytime we return to the same webpage url within less than five seconds. The method implemented to detect such event will be taking advantage of the events SetPageLocation and MouseClick. Everytime we have a mouse click we update the current timestamp and if a SetPageEvent message is received within the five next seconds pointing the current webpage, then we return a QuickReturn event.

We create the file `quickreturn.go` in the path `openreplay/backend/pkg/handlers/custom` containing the code shown below

```tsx
package custom

import (
    "strings"
    . "openreplay/backend/pkg/messages"
)

type QuickReturnDetector struct {
    timestamp   uint64
    currentPage string
    lastPage    string
}

// If received SetPageLocation on same 
func (h *QuickReturnDetector) HandleSetPageLocation(msg, messageID, timestamp) Message {
    if (h.timestamp + 5000 >= timestamp && h.lastPage == msg.URL) {
        h.timestamp = timestamp
        return h.Build()
    }
    h.lastPage = h.currentPage
    h.currentPage = msg.URL
    h.timestamp = timestamp
    return nil
}

// detect when a button is clicked (selector must have string 'botton' in it)
func (h *QuickReturnDetector) HandleMouseClick(msg, messageID, timestamp) {
    // update timestamp when botton is clicked ()
    if strings.contains(msg.selector, 'button') {
        h.timestamp = timestamp
    }
    return nil
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
    event := &CustomEvent {
        name:   'quickreturn',
        Payload:    h.currentPage,
    }
}
```

Now the heuristic it is created, it only needs to be enabled. In order to do so, we have to add the heuristic to the file `main.go` in the path `openreplay/backend/cmd/heuristics` as follows:

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

The heuristic is now available and the messages are sent as a Custom Event. To recompile the code follow the steps in *build and deploy* section from [**deploy from source**](https://docs.openreplay.com/deployment/deploy-source) page.

In this simple process we have created a new detector. Of course, your algorithm can be more sophisticated and include a combination of different type of events.

## Questions?

If you encounter any issues, connect to our [Slack](https://slack.openreplay.com) and get help from our community.