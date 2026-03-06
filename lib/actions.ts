"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// ─── Booking Actions ───

export async function createBooking(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const booking = await prisma.booking.create({
        data: {
            userId: session.user.id,
            destinationId: Number(formData.get("destinationId")),
            travelDate: new Date(formData.get("travelDate") as string),
            travelers: Number(formData.get("travelers")),
            message: (formData.get("message") as string) || null,
            status: "PENDING",
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/bookings");
    return booking;
}

export async function updateBookingStatus(bookingId: number, status: string) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.booking.update({
        where: { id: bookingId },
        data: { status },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/bookings");
}

// ─── Review Actions ───

export async function createReview(formData: FormData) {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    await prisma.review.create({
        data: {
            userId: session.user.id,
            destinationId: Number(formData.get("destinationId")),
            rating: Number(formData.get("rating")),
            comment: formData.get("comment") as string,
            isApproved: false,
        },
    });

    revalidatePath("/dashboard");
    revalidatePath("/admin/reviews");
}

export async function toggleReviewApproval(reviewId: number) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    const review = await prisma.review.findUnique({ where: { id: reviewId } });
    if (!review) throw new Error("Not found");

    await prisma.review.update({
        where: { id: reviewId },
        data: { isApproved: !review.isApproved },
    });

    revalidatePath("/admin/reviews");
    revalidatePath("/");
}

export async function deleteReview(reviewId: number) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.review.delete({ where: { id: reviewId } });
    revalidatePath("/admin/reviews");
    revalidatePath("/");
}

// ─── Destination Actions ───

export async function createDestination(formData: FormData) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.destination.create({
        data: {
            name: formData.get("name") as string,
            country: formData.get("country") as string,
            continent: formData.get("continent") as string,
            description: formData.get("description") as string,
            imageUrl: (formData.get("imageUrl") as string) || "/destinations/default.jpg",
            price: Number(formData.get("price")),
            rating: Number(formData.get("rating")) || 0,
            category: formData.get("category") as string,
            featured: formData.get("featured") === "on",
        },
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");
}

export async function updateDestination(id: number, formData: FormData) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.destination.update({
        where: { id },
        data: {
            name: formData.get("name") as string,
            country: formData.get("country") as string,
            continent: formData.get("continent") as string,
            description: formData.get("description") as string,
            imageUrl: formData.get("imageUrl") as string,
            price: Number(formData.get("price")),
            rating: Number(formData.get("rating")),
            category: formData.get("category") as string,
            featured: formData.get("featured") === "on",
        },
    });

    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");
}

export async function deleteDestination(id: number) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.destination.delete({ where: { id } });
    revalidatePath("/admin/destinations");
    revalidatePath("/destinations");
    revalidatePath("/");
}

// ─── Blog Actions ───

export async function createBlogPost(formData: FormData) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.blogPost.create({
        data: {
            title: formData.get("title") as string,
            slug: (formData.get("title") as string).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
            excerpt: formData.get("excerpt") as string,
            content: formData.get("content") as string,
            imageUrl: (formData.get("imageUrl") as string) || "/blog/default.jpg",
            authorId: session.user.id,
        },
    });

    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");
}

export async function deleteBlogPost(id: number) {
    const session = await auth();
    if (!session?.user || session.user.role !== "ADMIN") throw new Error("Forbidden");

    await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath("/");
}
