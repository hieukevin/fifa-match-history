import { TeamStats } from '@/app/type'
import React from 'react'
import Image from 'next/image'

function IndividualStatsLeft({teams} : {teams: TeamStats[]}) {

  return (
    <div className='relative z-10 mt-10 ml-10 flex flex-col gap-4'>
        {teams.map((team, index) => (
            <div key={index} className='flex gap-4'>
                <Image src={team.logo} alt={team.team} width={64} height={64} style={{objectFit: 'cover'}} />
                {/* <h1 className='flex items-center'>{team.team}</h1>  */}
                <p className='flex items-center'>{team.wins}/{team.draws}/{team.losses}</p>
            </div>
        ))}
    </div>
  )
}

export default IndividualStatsLeft