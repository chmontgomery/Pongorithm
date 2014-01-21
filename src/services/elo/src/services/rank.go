package services

import "models"

func NewRanking(playerScores models.AllPlayerScores) []models.Player {
	// TODO logic
	return []models.Player{playerScores.PlayerScores[0].PlayerObj,playerScores.PlayerScores[1].PlayerObj}
}
