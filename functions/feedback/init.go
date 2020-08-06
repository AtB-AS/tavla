package feedback

import (
	"cloud.google.com/go/pubsub"
	"context"
	"log"
	"os"
)

var pub publisher
var projectID = os.Getenv("GCP_PROJECT")
var feedbackTopic = os.Getenv("FEEDBACK_TOPIC")
var slackWebhook = os.Getenv("SLACK_WEBHOOK")

// This is really ugly, but there's no other entrypoint in which we can declare
// runtime dependencies.
var _testing = false
func init() {
	if _testing {
		pub = &noopPublisher{}
		return
	} else {
		client, err := pubsub.NewClient(context.Background(), projectID)
		if err != nil {
			log.Fatal(err)
		}
		topic := client.Topic(feedbackTopic)
		pub = gcpPublisher{topic}
	}
}
