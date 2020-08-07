package feedback

import (
	"context"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
	"net/http"
	"testing"
)

var _ = func() interface{} {
	_testing = true
	return nil
}()

type mockTransport struct {
	code int
}

func (t mockTransport) RoundTrip(request *http.Request) (*http.Response, error) {
	return &http.Response{StatusCode: t.code, Body: nil}, nil
}

func TestSlackNotifier_Notify(t *testing.T) {
	tests := []struct {
		name string
		n       slackNotifier
		wantErr bool
	}{
		{
			"It returns no error if the response code is 200",
			slackNotifier{
				c: &http.Client{
					Transport: &mockTransport{
						code: http.StatusOK,
					},
				},
			},
			false,
		},
		{
			"It errs if the response code is >= 400",
			slackNotifier{
				c: &http.Client{
					Transport: &mockTransport{
						code: http.StatusBadRequest,
					},
				},
			},
			true,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			got := test.n.notify(context.Background(), &pb.FormFeedback{})
			if test.wantErr && got == nil {
				t.Errorf("Expected error, got nil")
			}
		})
	}
}
