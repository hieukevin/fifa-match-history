import Pagination from "@/components/pagination";
import { getMatches } from "@/libs/_action";
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const perPage = 4;

  const { matches, matchesCount } = await getMatches({
    perPage: perPage,
    page: currentPage,
  });

  const prevPage = Number(currentPage) - 1 > 0 ? Number(currentPage) - 1 : 1;
  const nextPage = Number(currentPage) + 1;

  const totalPages = Math.ceil(matchesCount / perPage);
  const isPageOutOfRange = currentPage > totalPages;

  const pageNumbers = [];
  const offsetNumber = 3;
  for (
    let i = currentPage - offsetNumber;
    i <= currentPage + offsetNumber;
    i++
  ) {
    if (i >= 1 && i <= totalPages) {
      pageNumbers.push(i);
    }
  }

  return (
    <main className="h-screen flex flex-col items-center">
    
      <div className="flex flex-col lg:w-[55%] md:w-[80%] w-[95%] gap-5 z-0 flex-1">
    <h1 className="text-center lg:text-4xl sm:text-4xl text-xl z-10">Match History</h1>
        {matches.map((match, index) => (
          <div
            key={index}
            className="rounded-md px-6 sm:py-3 py-2 bg-slate-500 bg-opacity-80"
          >
            <div className="flex justify-center">
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full">
                <p className="sm:flex items-center hidden">{match.player1Team}</p>
                <Image
                  src={`/logos/${match.player1Team}.png`}
                  alt={match.player1Team}
                  width={64}
                  height={64}
                  style={{ objectFit: 'contain' }}
                  className="sm:m-5 m-2"
                />
                <p className="flex items-center justify-center font-semibold text-lg">
                  {match.player1Score}
                </p>
              </div>

              <p className="flex items-center mx-5">:</p>
              <div className="grid sm:grid-cols-3 grid-cols-2 w-full">
                <p className="flex items-center justify-center font-semibold text-lg">
                  {match.player2Score}
                </p>
                <Image
                  src={`/logos/${match.player2Team}.png`}
                  alt={match.player1Team}
                  width={64}
                  height={64}
                  style={{ objectFit: "fill" }}
                  className="sm:m-5 m-2"
                />
                <p className="sm:flex items-center hidden">
                  {match.player2Team}
                </p>
              </div>
            </div>
            <p className="text-center text-sm text-gray">{match.datePlayed}</p>
          </div>
        ))}
      </div>
      {isPageOutOfRange ? (
        <div>No more pages...</div>
      ) : (
        <div className="flex justify-center items-center sm:mt-16 absolute bottom-5 z-10">
            <Pagination prevPage={prevPage} nextPage={nextPage} pageNumbers={pageNumbers} currentPage={currentPage} totalPages={totalPages} totalPage={totalPages} />
        </div>
      )}
    </main>
  );
}
