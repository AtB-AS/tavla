package feedback

import (
	"context"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
)

type emailNotifier struct {}

func (e emailNotifier) notify(ctx context.Context, m *pb.FormFeedback) error {
	return nil
}

var _ notifier = emailNotifier{}
