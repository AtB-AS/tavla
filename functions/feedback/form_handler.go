package feedback

import (
	"cloud.google.com/go/pubsub"
	"context"
	"fmt"
	pb "github.com/atb-as/tavla/functions/feedback/proto"
	"google.golang.org/protobuf/proto"
	"log"
	"net/http"
	"net/url"
)

type formError string

func (f formError) Error() string {
	return string(f)
}

const (
	ErrEmptyBody  formError = "body cannot be empty"
	ErrEmptyEmail formError = "email cannot be empty"
	ErrEmptyName  formError = "name cannot be empty"
)

func HandleFormSubmission(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	body, email, name := r.FormValue("body"), r.FormValue("email"), r.FormValue("name")

	if body == "" {
		redirectToRefererWithError(w, r, ErrEmptyBody)
		return
	}

	if email == "" {
		redirectToRefererWithError(w, r, ErrEmptyEmail)
		return
	}

	if name == "" {
		redirectToRefererWithError(w, r, ErrEmptyName)
		return
	}

	err = publishFormFeedback(r.Context(), &pb.FormFeedback{
		Body:          body,
		Email:         email,
		Name:          name,
	})
	if err != nil {
		log.Printf("publish: %v", err)
		redirectToRefererWithError(w, r, err)
		return
	}

	http.Redirect(w, r, fmt.Sprintf("%s?success=true", r.Referer()), http.StatusSeeOther)
}

func redirectToRefererWithError(w http.ResponseWriter, r *http.Request, err error) {
	q := url.Values{
		"success": {"false"},
		"err":     {err.Error()},
	}
	http.Redirect(w, r, fmt.Sprintf("%s?%s", r.Referer(), q.Encode()), http.StatusSeeOther)
}

func publishFormFeedback(ctx context.Context, msg *pb.FormFeedback) error {
	data, err := proto.Marshal(msg)
	if err != nil {
		return err
	}

	if err := pub.publish(ctx, &pubsub.Message{
		Data: data,
	}); err != nil {
		return err
	}

	return nil
}
