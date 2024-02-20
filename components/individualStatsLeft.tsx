import { getTeamStats } from '@/libs/_action';
import Image from 'next/image';
import { IoIosArrowDown } from "react-icons/io";

async function IndividualStatsLeft({user} : {user: string}) {

  const teamsStats = await getTeamStats({user: user});
  return (
    <div className='z-0 mt-10 ml-4 flex flex-col gap-4 overflow-scroll max-h-screen'>
        <div className='grid grid-cols-3 gap-4'>
          <button>
            <IoIosArrowDown className='sm:hidden block'/>
          </button>
          <p className='flex items-center justify-center'>W/D/L</p>
          <p className='flex items-center justify-center'>Goals</p>
        </div>
        {teamsStats.map((team, index) => (
            <div key={index} className='grid grid-cols-3 gap-4'>
              <div className='w-full h-full flex items-center justify-center'>
                <Image src={`/logos/${team.team}.png`} alt={team.team} width={64} height={64} className=' object-contain' />
              </div>
                <p className='flex items-center justify-center'><span className=' text-green-400'>{team.wins}</span>/{team.draws}/<span className=' text-red-400'>{team.losses}</span></p>
                <p className='flex items-center justify-center'><span className=''>{team.goalsScored}</span>:<span className=''>{team.goalsConcede}</span></p>            
              </div>
        ))}
    </div>
  )
}

export default IndividualStatsLeft