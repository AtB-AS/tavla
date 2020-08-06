package feedback

import (
	"bytes"
	"context"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
	"google.golang.org/protobuf/proto"
	"os"
	"text/template"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

var emailTemplate = `Fra: {{ .Name }} <{{ .Email }}>

{{ .Body }}`
var emailTmpl = template.Must(template.New("email").Parse(emailTemplate))

type emailNotifier struct{}

func (e *emailNotifier) notify(ctx context.Context, m *pb.FormFeedback) error {
	buf := bytes.Buffer{}
	err := emailTmpl.Execute(&buf, m)
	if err != nil {
		return err
	}

	from := mail.NewEmail("AtB Tavla", "tavla@atb.no")
	subject := "Ny tilbakemelding i Tavla"
	to := mail.NewEmail("AMP Utviklere", "utvikler@mittatb.no")
	message := mail.NewSingleEmail(from, subject, to, buf.String(), "")
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))

	if _, err := client.Send(message); err != nil {
		return err
	}
	return nil
}

func newEmailNotifier() *emailNotifier {
	return &emailNotifier{}
}

var _ notifier = &emailNotifier{}

func TavlaFeedbackNotifierEmail(ctx context.Context, m PubSubMessage) error {
	notifier := newEmailNotifier()

	var msg pb.FormFeedback
	if err := proto.Unmarshal(m.Data, &msg); err != nil {
		return err
	}

	return notifier.notify(ctx, &msg)
}
