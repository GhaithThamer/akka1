import prisma from "@/utils/db";

export default async function Home() {
  const containers = (await prisma.container.findMany()) ?? [];
  const firms = (await prisma.firm.findMany()) ?? [];
  const firms_with_container =
    (await prisma.firm.findMany({
      include: {
        containers: true,
      },
    })) ?? [];

  return (
    <div className="container mx-auto p-4">
      <div>firms: {JSON.stringify(firms)}</div>
      <br />
      <div>containers: {JSON.stringify(containers)}</div>
      <br />
      <div>firms and containers: {JSON.stringify(firms_with_container)}</div>
    </div>
  );
}
