package services

import "models"

func NewRanking(p1 models.PlayerScoreTransfer, p2 models.PlayerScoreTransfer) []models.Player {
	// TODO logic
	return []models.Player{p1.PlayerObj,p2.PlayerObj}
}
