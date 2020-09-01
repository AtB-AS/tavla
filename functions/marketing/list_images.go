package marketing

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"cloud.google.com/go/storage"
	"golang.org/x/sync/errgroup"
	"google.golang.org/api/iterator"
)

var (
	bucketName    = os.Getenv("TAVLA_BUCKET")
	storageClient *storage.Client
)

func init() {
	var err error
	storageClient, err = storage.NewClient(context.Background())
	if err != nil {
		log.Fatal(err)
	}
}

type image struct {
	FadeLength string `json:"fadeLength"`
	URL        string `json:"url"`
}

type images struct {
	Portrait  []image `json:"portrait"`
	Landscape []image `json:"landscape"`
}

type listImagesResponse struct {
	Images images `json:"images,omitempty"`
	Error  string `json:"error,omitempty"`
}

// HandleListMarketingImages ...
func HandleListMarketingImages(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		handleCORSPreflight(w, r)
		return
	}

	var portraits = []image{}
	var landscapes = []image{}
	g, ctx := errgroup.WithContext(r.Context())

	// Fetch portrait images
	g.Go(func() error {
		it := storageClient.Bucket(bucketName).Objects(ctx, &storage.Query{
			Prefix: "portrait/",
		})
		for {
			obj, err := it.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				return err
			}
			if obj.Name != "portrait/" {
				fadeLength, ok := obj.Metadata["fadeLength"]
				if !ok {
					fadeLength = "10"
				}
				portraits = append(portraits, image{
					URL:        obj.MediaLink,
					FadeLength: fadeLength,
				})
			}
		}
		return nil
	})

	// Fetch landscape images
	g.Go(func() error {
		it := storageClient.Bucket(bucketName).Objects(ctx, &storage.Query{
			Prefix: "landscape/",
		})
		for {
			obj, err := it.Next()
			if err == iterator.Done {
				break
			}
			if err != nil {
				return err
			}
			if obj.Name != "landscape/" {
				fadeLength, ok := obj.Metadata["fadeLength"]
				if !ok {
					fadeLength = "10"
				}
				landscapes = append(landscapes, image{
					FadeLength: fadeLength,
					URL:        obj.MediaLink})
			}
		}
		return nil
	})

	err := g.Wait()
	if err != nil {
		writeErr(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = writeResponse(w, listImagesResponse{
		Images: images{
			Landscape: landscapes,
			Portrait:  portraits,
		},
	})
	if err != nil {
		log.Println(err.Error())
	}
}

func handleCORSPreflight(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	w.Header().Set("Access-Control-Max-Age", "3600")
	w.WriteHeader(http.StatusNoContent)
}

func writeResponse(w http.ResponseWriter, v interface{}) error {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Cache-Control", "public, max-age=3600")

	if err := json.NewEncoder(w).Encode(v); err != nil {
		return err
	}
	return nil
}

func writeErr(w http.ResponseWriter, msg string, code int) {
	res := listImagesResponse{
		Error: msg,
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	err := json.NewEncoder(w).Encode(res)
	if err != nil {
		log.Println(err.Error())
	}
}
