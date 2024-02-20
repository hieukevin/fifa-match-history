import { TeamStats } from '@/app/type'
import React from 'react'
import Image from 'next/image'
import { getTeamStats } from '@/libs/_action';

async function IndividualStatsRight({user} : {user: string}) {
  const teamsStats = await getTeamStats({user: user});

  return (
    <div className='z-0 mt-10 mr-4 flex flex-col gap-4 overflow-scroll max-h-screen'>
        <div className='grid grid-cols-3 gap-4'>
          <></>
          <p className='flex items-center justify-center'>Goals</p>
          <p className='flex items-center justify-center'>W/D/L</p>
        </div>
        {teamsStats.map((team, index) => (
            <div key={index} className='grid grid-cols-3 gap-4'>
                <p className='flex items-center justify-center'><span className=''>{team.goalsScored}</span>:<span className=''>{team.goalsConcede}</span></p>
                <p className='flex items-center justify-center'><span className=' text-green-400'>{team.wins}</span>/{team.draws}/<span className=' text-red-400'>{team.losses}</span></p>
                <div className=' w-full h-full'>
                  <Image  src={`/logos/${team.team}.png`} alt={team.team} width={64} height={64} className='object-contain' />
                </div>
            </div>
        ))}
    </div>
  )
}

export default IndividualStatsRight