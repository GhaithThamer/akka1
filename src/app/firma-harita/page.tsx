import MapWrapper from "@/components/mapWrapper";
import prisma from "@/utils/db";
import { Container, Firm } from "@prisma/client";

export default async function FirmaHarita() {
  const firms_with_container: (Firm & { containers: Container[] })[] =
    await prisma.firm.findMany({
      include: {
        containers: true,
      },
    });

  const containers = await prisma.container.findMany();

  const renderedContainers = containers.map((container) => (
    <div key={container.id}>
      <h2>{container.recordNo}</h2>
      <p>{container.type}</p>
    </div>
  ));

 return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        AKKA ÇEVRE ATIK YÖNETİMİ SAN. Ve TİC. A.Ş. KONTEYNER YERLERİ
      </h1>
      <div className="flex flex-row gap-4">
        <div className="w-1/4">{renderedContainers}</div>
        <div className="h-[500px] w-full">
          <MapWrapper firms={firms_with_container} />
        </div>
      </div>
    </main>
  );
}
