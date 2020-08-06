package feedback

import (
	"bytes"
	"context"
	"fmt"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
	"google.golang.org/protobuf/proto"
	html "html/template"
	"net/http"
	"os"
	"text/template"

	"github.com/sendgrid/sendgrid-go"
	"github.com/sendgrid/sendgrid-go/helpers/mail"
)

var emailTemplate = `Fra: {{ .Name }} <{{ .Email }}>

{{ .Body }}

Nettleser: {{ .UserAgent }}
`

var emailHTMLTemplate = `<html>
<body>
	<h1>Ny tilbakemelding i Tavla</h1>
	<p>{{ .Name }} ({{ .Email }}), skrev: </p>
	<blockquote>{{ .Body }}</blockquote>
	<small>Nettleser: {{ .UserAgent }}</small>
</body>
</html>
`

var emailTmpl = template.Must(template.New("email").Parse(emailTemplate))
var htmlTmpl = html.Must(html.New("email").Parse(emailHTMLTemplate))

type emailNotifier struct{}

func (e *emailNotifier) notify(ctx context.Context, m *pb.FormFeedback) error {
	plainBuf := bytes.Buffer{}
	err := emailTmpl.Execute(&plainBuf, m)
	if err != nil {
		return err
	}

	htmlBuf := bytes.Buffer{}
	err = htmlTmpl.Execute(&htmlBuf, m)
	if err != nil {
		return err
	}

	from := mail.NewEmail("AtB Tavla", "utvikler@mittatb.no")
	subject := "Ny tilbakemelding i Tavla"
	to := mail.NewEmail("AMP Utviklere", "utvikler@mittatb.no")
	message := mail.NewSingleEmail(from, subject, to, plainBuf.String(), htmlBuf.String())
	client := sendgrid.NewSendClient(os.Getenv("SENDGRID_API_KEY"))

	res, err := client.Send(message)
	if err != nil {
		return err
	}
	if res.StatusCode >= http.StatusBadRequest {
		return fmt.Errorf("failed to send email, got code: %d", res.StatusCode)
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
