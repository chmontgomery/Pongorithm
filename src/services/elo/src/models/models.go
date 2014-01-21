package models

type Player struct {
	Id int
	Rank float64
}

type PlayerScoreTransfer struct {
	PlayerObj Player
	Score int
}
