'use server'

import { MatchModel, TeamStatsModel, User, UserModel } from "@/models/models"
import { InferSchemaType } from "mongoose"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { connectToDatabase } from "./db"
import { TeamStatsDocument } from "@/app/type"


export async function getUser({name}: {name: string}): Promise<InferSchemaType<typeof User>>{
    try{
        await connectToDatabase()
        const user = await UserModel.findOne({name: name})
        if (!user) {
            throw new Error('No user found')
        }
        return user
    }
    catch (error) {
        throw new Error('Error finding user')
    }

}

async function updateUserStats({myGoals, opponentsGoals, user1, user2} : {myGoals: number, opponentsGoals: number, user1: InferSchemaType<typeof User>, user2: InferSchemaType<typeof User>}) {
    try {
        if (myGoals > opponentsGoals){
            user1.wins += 1
            user2.losses += 1
        } else if (myGoals < opponentsGoals){
            user1.losses += 1
            user2.wins += 1
        } else {
            user1.draws += 1
            user2.draws += 1
        }
        await UserModel.updateOne({name: user1.name}, user1)
        await UserModel.updateOne({name: user2.name}, user2)
    }
    catch (error) {
        throw new Error('Error updating user stats')
    }
}

enum MatchResult {
    WIN = 0,
    LOSS = 1,
    DRAW = 2
}


function matchResult({myGoals, opponentsGoals}: {myGoals: number, opponentsGoals: number}): MatchResult{
    if (myGoals > opponentsGoals){
        return MatchResult.WIN
    } else if (myGoals < opponentsGoals){
        return MatchResult.LOSS
    } else {
        return MatchResult.DRAW
    }
}

async function createNewTeamStats({team, myGoals, opponentsGoals, userName}: {team: string, myGoals: number, opponentsGoals: number, userName: String}){
    try {
        const result = matchResult({myGoals, opponentsGoals})
        switch (result){
            case MatchResult.WIN:
                
                await new TeamStatsModel({
                    team: team,
                    games: 1,
                    wins: 1,
                    draws: 0,
                    losses: 0,
                    goalsScored: myGoals,
                    goalsConcede: opponentsGoals,
                    user: userName
                }).save()
                break
            case MatchResult.LOSS:
                
                await new TeamStatsModel({
                    team: team,
                    games: 1,
                    wins: 0,
                    draws: 0,
                    losses: 1,
                    goalsScored: myGoals,
                    goalsConcede: opponentsGoals,
                    user: userName
                }).save()

                break
            case MatchResult.DRAW:
                
                const drawTeam = new TeamStatsModel({
                    team: team,
                    games: 1,
                    wins: 0,
                    draws: 1,
                    losses: 0,
                    goalsScored: myGoals,
                    goalsConcede: opponentsGoals,
                    user: userName
                })
                
                await drawTeam.save()
                break
        }
        return
    }
    catch (error) {
        throw new Error('Error creating new team stats')
    }
}

async function updateTeamStats({myGoals, opponentsGoals, team, user}: {myGoals: number, opponentsGoals: number, team: string, user: InferSchemaType<typeof User>}){
    try {
        const userTeam = await TeamStatsModel.findOne({team: team, user: user.name})
        if (!userTeam){
            await createNewTeamStats({team: team, myGoals: myGoals, opponentsGoals: opponentsGoals, userName: user.name})
            return
        }
        const result = matchResult({myGoals, opponentsGoals})
        switch (result){
            case MatchResult.WIN:
                userTeam.wins += 1
                break
            case MatchResult.LOSS:
                userTeam.losses += 1
                break
            case MatchResult.DRAW:
                userTeam.draws += 1
                break
        }
        userTeam.goalsScored += myGoals
        userTeam.goalsConcede += opponentsGoals
        userTeam.games += 1
        await TeamStatsModel.updateOne({team: team, user: user.name}, userTeam)
    }
    catch (error) {
        throw new Error('Error updating team stats')
    }
}


export async function createMatch(prevState: any, formData: FormData) {
    const schema = z.object({
        hieu_score: z.number().min(0, 'Goals must be a positive number'),
        kuba_score: z.number().min(0, 'Goals must be a positive number'),
        hieu_team: z.string().min(1, 'Please select a team'),
        kuba_team: z.string().min(1, 'Please select a team'),
        datePlayed: z.string(),
        })
    try {
        const data = schema.parse({
            hieu_score: Number(formData.get('hieu_score')),
            kuba_score: Number(formData.get('kuba_score')),
            hieu_team: formData.get('hieu_team'),
            kuba_team: formData.get('kuba_team'),
            datePlayed: formData.get('datePlayed')
        })
        const hieuUser = await getUser({name: 'Hieu'}) as InferSchemaType<typeof User>
        const kubaUser = await getUser({name: 'Kuba'}) as InferSchemaType<typeof User>

        const newMatch =  new MatchModel({
            player1: hieuUser,
            player2: kubaUser,
            player1Score: data.hieu_score,
            player2Score: data.kuba_score,
            player1Team: data.hieu_team,
            player2Team: data.kuba_team,
            datePlayed: data.datePlayed
        })
        await newMatch.save()

        await updateTeamStats({myGoals: data.hieu_score, opponentsGoals: data.kuba_score, team: data.hieu_team, user: hieuUser})
        await updateTeamStats({myGoals: data.kuba_score, opponentsGoals: data.hieu_score, team: data.kuba_team, user: kubaUser})

        await updateUserStats({myGoals: data.hieu_score, opponentsGoals: data.kuba_score, user1: hieuUser, user2: kubaUser})
        revalidatePath('/admin')
        return {
            message: 'success',
            errors: undefined,
            fieldValue: {
                hieu_score: 0,
                kuba_score: 0,
                hieu_team: '',
                kuba_team: '',
                datePlayed: new Date().toISOString().split('T')[0]
            }

        }
    }
    catch (error) {
        console.log(error)
        return {
            message: 'error',
            errors: {
                hieu_score: 'Goals must be a positive number',
                kuba_score: 'Goals must be a positive number',
                hieu_team: 'Please select a team',
                kuba_team: 'Please select a team',
                datePlayed: 'Please select a date'
            },
            fieldValue: {
                hieu_score: Number(formData.get('hieu_score')),
                kuba_score: Number(formData.get('kuba_score')),
                hieu_team: formData.get('hieu_team'),
                kuba_team: formData.get('kuba_team'),
                datePlayed: formData.get('datePlayed')
            }
        }
    }
  }


export async function getWins() {
    try {
        await connectToDatabase()
        const user = await UserModel.findOne({name: 'Hieu'})
        if (!user) {
            throw new Error('No user found')
        }
        const win = user.wins
        const draws = user.draws
        const losses = user.losses
        const stats = {win, draws, losses}
        return stats
    }
    catch (error) {
        throw new Error('Error getting wins')
    }
}

 
export async function getGoals(){
    try {
        await connectToDatabase()
        const matches = await MatchModel.find()
        const goals = matches.reduce((accumulated: { totalGoals1: number, totalGoals2: number }, currentValue) => {
            return {
                totalGoals1: accumulated.totalGoals1 + currentValue.player1Score,
                totalGoals2: accumulated.totalGoals2 + currentValue.player2Score
            }
        }, { totalGoals1: 0, totalGoals2: 0 })
        return goals
    }
    catch (error) {
        throw new Error('Error getting goals')
    }
}


export async function getTeamStats({user}: {user: string}){
    try {
        await connectToDatabase()
        const teamStats = await TeamStatsModel.find({user: user})
        return teamStats
    }
    catch (error) {
        throw new Error('Error getting team stats')
    }
}

export async function getMatches({perPage, page}: {perPage: number, page: number}){
    try {
        await connectToDatabase()
        const matches = await MatchModel.find().sort({datePlayed: -1}).skip(perPage * (page-1)).limit(perPage)
        const matchesCount = await MatchModel.countDocuments()
        const response = { matches, matchesCount }
        return response
    }
    catch (error) {
        throw new Error('Error getting matches')
    }
}