package feedback

import (
	"net/http"
	"net/http/httptest"
	"net/url"
	"strings"
	"testing"
)

var _ = func() interface{} {
	_testing = true
	return nil
}()

func TestHandleFormSubmission(t *testing.T) {
	tests := []struct {
		name     string
		form     url.Values
		wantCode int
		wantErr error
	}{
		{"Fails if body is missing", url.Values{
			"email": {"torbjorn@mittatb.no"},
			"name":  {"Torbjørn"},
		}, http.StatusSeeOther, ErrEmptyBody},
		{"Fails if email is missing", url.Values{
			"body": {"Somebody"},
			"name": {"Torbjørn"},
		}, http.StatusSeeOther, ErrEmptyEmail},
		{"Fails if name is missing", url.Values{
			"body":  {"Hello, world"},
			"email": {"torbjorn@mittatb.no"},
		}, http.StatusSeeOther, ErrEmptyName},
		{"Succeeds if all fields are present", url.Values{
			"body":  {"hello, world"},
			"email": {"torbjorn@mittatb.no"},
			"name":  {"Torbjørn"},
		}, http.StatusSeeOther, nil},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			request := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(test.form.Encode()))
			request.Header.Set("Content-Type", "application/x-www-form-urlencoded")
			response := httptest.NewRecorder()
			HandleFormSubmission(response, request)

			gotCode := response.Code
			wantCode := test.wantCode

			if gotCode != wantCode {
				t.Errorf("got code %d, want %d", gotCode, wantCode)
			}

			gotLocation := response.Header().Get("Location")
			q, err := url.Parse(gotLocation)
			if err != nil {
				t.Errorf("invalid url in Location header, got %q", gotLocation)
			}

			if test.wantErr != nil {
				errMsg := q.Query().Get("err")
				if errMsg != test.wantErr.Error() {
					t.Errorf("expected err= to be %q, got %q", test.wantErr.Error(), errMsg)
				}
				success := q.Query().Get("success")
				if success != "false" {
					t.Errorf("wanted sucess=false, got %q", success)
				}
			}
		})
	}
}
