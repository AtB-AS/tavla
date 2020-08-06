package feedback

import (
	"context"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
)

// PubSubMessage is the payload of a Pub/Sub event.
type PubSubMessage struct {
	Data []byte `json:"data"`
}

type notifier interface {
	notify(ctx context.Context, m *pb.FormFeedback) error
}

type noopNotifier struct {}

func (n noopNotifier) notify(ctx context.Context, m *pb.FormFeedback) error {
	return nil
}
