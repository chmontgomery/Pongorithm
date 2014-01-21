package main

import (
    "fmt"
    "net/http"
    "encoding/json"
	"models"
	"services"
)

func handler(res http.ResponseWriter, req *http.Request) {
    players := services.NewRanking(models.PlayerScoreTransfer{models.Player{1,99},21},models.PlayerScoreTransfer{models.Player{2,10},11})

    data, err := json.Marshal(players)
    if err != nil {
      fmt.Println("error:", err)
    }

    res.Header().Set("Access-Control-Allow-Origin", "*") // allow cross domain AJAX requests
    res.Header().Set("Content-Type", "application/json; charset=utf-8")
    res.Write(data)
}

func main() {
    fmt.Println("listening at http://localhost:8080/")
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)
}
