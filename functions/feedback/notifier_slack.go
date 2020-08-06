package feedback

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
	"google.golang.org/protobuf/proto"
	"net/http"
	"text/template"
)

type slackChannelPostRequest struct {
	Text string `json:"text"`
}

type slackNotifier struct{
	c *http.Client
}

var slackTemplate = `*Ny tilbakemelding til Tavla:*
Navn: {{ .Name }}
E-post: {{ .Email }}

{{ .Body }}
`
var slackTmpl = template.Must(template.New("slackTemplate").Parse(slackTemplate))

func (s *slackNotifier) notify(ctx context.Context, m *pb.FormFeedback) error {
	buf := bytes.Buffer{}
	if err := slackTmpl.Execute(&buf, m); err != nil {
		return err
	}

	body, err := json.Marshal(slackChannelPostRequest{string(buf.Bytes())})
	if err != nil {
		return err
	}
	req, err := http.NewRequestWithContext(ctx, http.MethodPost, slackWebhook, bytes.NewReader(body))
	if err != nil {
		return err
	}

	res, err := s.c.Do(req)
	if err != nil {
		return err
	}

	if res.StatusCode >= http.StatusBadRequest {
		return fmt.Errorf("failed to post slack message, got status %d", res.StatusCode)
	}

	return nil
}

func newSlackNotifier() *slackNotifier {
	return &slackNotifier{
		c: &http.Client{},
	}
}

func TavlaFeedbackNotifierSlack(ctx context.Context, m PubSubMessage) error {
	notifier := newSlackNotifier()

	var msg pb.FormFeedback
	if err := proto.Unmarshal(m.Data, &msg); err != nil {
		return err
	}

	return notifier.notify(ctx, &msg)
}

var _ notifier = &slackNotifier{}

