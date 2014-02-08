package services //same package name as source file

import (
    "models"
    "testing"
	"services"
	"strconv"
)

func FloatToString(input_num float64) string {
	// to convert a float number to a string
	return strconv.FormatFloat(input_num, 'f', 6, 64)
}

func Test_NewRanking_1(t *testing.T) { //test function starts with "Test" and takes a pointer to type testing.T

    playerScores := models.AllPlayerScores{}

	playerOneScore := models.PlayerScore{}
	playerOneScore.Score = 21
	playerOneScore.PlayerObj.Id = "1"
	playerOneScore.PlayerObj.Rank = 100

	playerTwoScore := models.PlayerScore{}
	playerTwoScore.Score = 11
	playerTwoScore.PlayerObj.Id = "2"
	playerTwoScore.PlayerObj.Rank = 100

	playerScores.PlayerScores = append(playerScores.PlayerScores, playerOneScore, playerTwoScore)

	result := services.NewRanking(playerScores)

	resultLen := len(result)
    if resultLen != 2 {
        t.Error("expected 2 but got " + strconv.Itoa(resultLen))
    }

	p1 := result[0]
	p2 := result[1]
	if p1.Rank != 110 {
		t.Error("expected p1 rank to be 110 but got " + FloatToString(p1.Rank))
	}

	if p2.Rank != 90 {
		t.Error("expected p2 rank to be 90 but got " + FloatToString(p2.Rank))
	}
}

func Test_NewRanking_2(t *testing.T) {

	playerScores := models.AllPlayerScores{}

	playerOneScore := models.PlayerScore{}
	playerOneScore.Score = 5
	playerOneScore.PlayerObj.Id = "1"
	playerOneScore.PlayerObj.Rank = 100

	playerTwoScore := models.PlayerScore{}
	playerTwoScore.Score = 21
	playerTwoScore.PlayerObj.Id = "2"
	playerTwoScore.PlayerObj.Rank = 100

	playerScores.PlayerScores = append(playerScores.PlayerScores, playerOneScore, playerTwoScore)

	result := services.NewRanking(playerScores)

	resultLen := len(result)
	if resultLen != 2 {
		t.Error("expected 2 but got " + strconv.Itoa(resultLen))
	}

	p1 := result[0]
	p2 := result[1]
	if p1.Rank != 84 {
		t.Error("expected p1 rank to be 84 but got " + FloatToString(p1.Rank))
	}

	if p2.Rank != 116 {
		t.Error("expected p2 rank to be 116 but got " + FloatToString(p2.Rank))
	}
}
