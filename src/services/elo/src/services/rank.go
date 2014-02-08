package services

import "models"

func NewRanking(playerScores models.AllPlayerScores) []models.Player {
	// TODO better logic taking current ranking into account

	var player1 models.PlayerScore = playerScores.PlayerScores[0]
	var player2 models.PlayerScore = playerScores.PlayerScores[1]

	var diff float64 = float64(player1.Score - player2.Score)

	if player1.Score > player2.Score {
		// player 1 won!
		player1.PlayerObj.Rank += diff
		player2.PlayerObj.Rank -= diff
	} else if player1.Score < player2.Score {
		// player 2 won!
		player1.PlayerObj.Rank -= diff
		player2.PlayerObj.Rank += diff
	}

	return []models.Player{player1.PlayerObj,player2.PlayerObj}
}
