import { TeamStats } from '@/app/type'
import React from 'react'
import Image from 'next/image'

function IndividualStatsRight({teams} : {teams: TeamStats[]}) {
  return (
    <div className='relative z-10 mt-10 mr-10 flex flex-col gap-4'>
        {teams.map((team, index) => (
            <div key={index} className='flex gap-6'>
                <p className='flex items-center'>{team.wins}/{team.draws}/{team.losses}</p>
                {/* <h1 className='flex items-center'>{team.team}</h1>  */}
                <Image src={team.logo} alt={team.team} width={64} height={64} style={{objectFit: 'cover'}}/>
            </div>
        ))}
    </div>
  )
}

export default IndividualStatsRight