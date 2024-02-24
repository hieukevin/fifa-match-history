import mongoose, {InferSchemaType} from "mongoose";
import { ZodObject, objectUtil } from "zod";

export const User = new mongoose.Schema({
    name: {type: String, required: true},
    wins:  {type: Number, default: 0},
    draws: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    teams: Array,
    admin: {type: Boolean, default: false}
})

export const Match = new mongoose.Schema({
    datePlayed: { type: String, default: () => new Date().toISOString() },
    createdAt: { type: Date, default: Date.now },
    player1: {type: User, required: true},
    player2: {type: User, required: true},
    player1Score: {type: Number, required: true},
    player2Score: {type: Number, required: true},
    player1Team: {type: String, required: true},
    player2Team: {type: String, required: true},
})

export const teamStats = new mongoose.Schema({
    team: {type: String, required: true},
    games: {type: Number, default: 0},
    wins: {type: Number, default: 0},
    draws: {type: Number, default: 0},
    losses: {type: Number, default: 0},
    goalsScored: {type: Number, default: 0},
    goalsConcede: {type: Number, default: 0},
    user: {type: String, required: true}
})

export const UserModel: mongoose.Model<InferSchemaType<typeof User>> = mongoose.models?.User ?? mongoose.model('User', User);

export const MatchModel: mongoose.Model<InferSchemaType<typeof Match>> = mongoose.models?.Match ?? mongoose.model('Match', Match);

export const TeamStatsModel: mongoose.Model<InferSchemaType<typeof teamStats>> = mongoose.models?.teamStat ?? mongoose.model('teamStat', teamStats);