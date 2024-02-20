import AdminForm from "@/components/adminForm";
import { getTeamStats } from "@/libs/_action";
import { UserButton } from "@clerk/nextjs";

async function Page() {

  const hieuTeamStats = await getTeamStats({user: 'Hieu'});
  const kubaTeamStats = await getTeamStats({user: 'Kuba'});

  return (
    <main className="w-full pt-10">
      <div className="fixed right-0 top-0 p-2">
        <UserButton  />
      </div>
      <AdminForm teams1={JSON.parse(JSON.stringify(hieuTeamStats))} teams2={JSON.parse(JSON.stringify(kubaTeamStats))} />
    </main>
  );
}

export default Page;
