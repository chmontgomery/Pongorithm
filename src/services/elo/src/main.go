package main

import (
    "fmt"
    "net/http"
    "encoding/json"
	"models"
	"services"
)

func handler(res http.ResponseWriter, req *http.Request) {

	res.Header().Set("Access-Control-Allow-Origin", "*") // allow cross domain AJAX requests

	p := make([]byte, req.ContentLength)
	_, err := req.Body.Read(p)

	if err == nil {
		var playerScores models.AllPlayerScores
		errUnmarshal := json.Unmarshal(p, &playerScores)
		if errUnmarshal == nil {
			players := services.NewRanking(playerScores)
			data, err := json.Marshal(players)
			if err == nil {
				fmt.Println("Successfully calculated new rankings for Players.")
				res.Header().Set("Content-Type", "application/json; charset=utf-8")
				res.Write(data)
			} else {
				fmt.Println("error:", err)
			}
		} else {
			fmt.Println("Unable to unmarshall the JSON request:", errUnmarshal);
		}
	} else {
		fmt.Println("Unable to read request body:", err);
	}
}

func main() {
    fmt.Println("listening at http://localhost:8080/")
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
