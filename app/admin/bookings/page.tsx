import { prisma } from "@/lib/prisma";
import { BookingsManager } from "./BookingsManager";

export default async function AdminBookings() {
    const bookings = await prisma.booking.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            user: true,
            destination: true,
        },
    });

    return (
        <div>
            <h1 className="text-2xl font-bold text-navy mb-6">Quản lý đặt chỗ</h1>
            <BookingsManager bookings={JSON.parse(JSON.stringify(bookings))} />
        </div>
    );
}
