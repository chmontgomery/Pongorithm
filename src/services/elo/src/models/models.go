package models

type Player struct {
	Id int
	Rank float64
}

type PlayerScore struct {
	PlayerObj Player
	Score int
}

type AllPlayerScores struct {
	PlayerScores []PlayerScore
}
