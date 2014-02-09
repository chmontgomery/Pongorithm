package main

import (
    "fmt"
    "net/http"
    "encoding/json"
	"models"
	"services"
	"io/ioutil"
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
				fmt.Println("Successfully calculated new rankings for Players:", players)
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

	file, errReadFile := ioutil.ReadFile("./config.json")
	if errReadFile != nil {
		fmt.Printf("Error reading config.json: %v\n", errReadFile)
		return
	}

	var config models.ServiceConfig
	errUnmarshal := json.Unmarshal(file, &config)

	if errUnmarshal != nil {
		fmt.Printf("Error unmarshalling config.json: %v\n", errUnmarshal)
		return
	}

	fmt.Println("listening at http://" + config.Url)
    http.HandleFunc("/", handler)
    http.ListenAndServe(config.Url, nil)
}
