import { prisma } from "@/lib/prisma";
import { DestinationsManager } from "./DestinationsManager";

export default async function AdminDestinations() {
    const destinations = await prisma.destination.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { bookings: true, reviews: true } } },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-6">Quản lý điểm đến</h1>
            <DestinationsManager destinations={JSON.parse(JSON.stringify(destinations))} />
        </div>
    );
}
