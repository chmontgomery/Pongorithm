package models

type Player struct {
	Id string
	Rank float64
}

type PlayerScore struct {
	PlayerObj Player
	Score int
}

type AllPlayerScores struct {
	PlayerScores []PlayerScore
}

type ServiceConfig struct {
	Url string
}
