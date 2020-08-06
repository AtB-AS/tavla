package feedback

import (
	"cloud.google.com/go/pubsub"
	"context"
)

type publisher interface {
	publish(ctx context.Context, m *pubsub.Message) error
}

type noopPublisher struct {}

func (p noopPublisher) publish(ctx context.Context, m *pubsub.Message) error {
	return nil
}

type gcpPublisher struct {
	t *pubsub.Topic
}

func (p gcpPublisher) publish(ctx context.Context, m *pubsub.Message) error {
	res := p.t.Publish(ctx, m)
	if _, err := res.Get(ctx); err != nil {
		return err
	}
	return nil
}
