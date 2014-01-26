'use strict';

var mongoose = require('mongoose');

var productModel = function() {

    var playerSchema = mongoose.Schema({
        name: { type: String, required: true },
        wins: { type: Number, required: false, 'default': 0 },
        losses: { type: Number, required: false, 'default': 0 },
        streak: { type: Number, required: false, 'default': 0 },
        createdDate: { type: Date, 'default': Date.now },
        rank: { type: Number, 'default': 100 }
    },
    {
        toObject: { getters: true },
        toJSON: { virtuals: true }
    });

    playerSchema.virtual('matchesPlayed').get(function(){
        return this.wins + this.losses;
    });

    playerSchema.virtual('currentStreak').get(function(){
        if (!this.streak) return 0;
        var type = this.streak > 0 ? 'W' : 'L';
        return type + Math.abs(this.streak).toString();
    });

    return mongoose.model('Player', playerSchema);
};

module.exports = new productModel();