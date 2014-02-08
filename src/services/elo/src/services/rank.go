package services

import "models"

func NewRanking(playerScores models.AllPlayerScores) []models.Player {
	// TODO better logic taking current ranking into account

	player1 := playerScores.PlayerScores[0]
	player2 := playerScores.PlayerScores[1]

	if player1.Score > player2.Score {
		// player 1 won!
		diff := float64(player1.Score - player2.Score)
		player1.PlayerObj.Rank += diff
		player2.PlayerObj.Rank -= diff
	} else if player1.Score < player2.Score {
		// player 2 won!
		diff := float64(player2.Score - player1.Score)
		player1.PlayerObj.Rank -= diff
		player2.PlayerObj.Rank += diff
	}

	return []models.Player{player1.PlayerObj,player2.PlayerObj}
}
