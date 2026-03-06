import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDestinations } from "@/components/home/FeaturedDestinations";
import { ServicesSection } from "@/components/home/ServicesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogPreview } from "@/components/home/BlogPreview";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { prisma } from "@/lib/prisma";

async function getFeaturedDestinations() {
  return prisma.destination.findMany({
    where: { featured: true },
    take: 6,
    orderBy: { rating: "desc" },
  });
}

async function getApprovedReviews() {
  return prisma.review.findMany({
    where: { isApproved: true },
    include: { user: true, destination: true },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

async function getLatestBlogPosts() {
  return prisma.blogPost.findMany({
    take: 3,
    orderBy: { publishedAt: "desc" },
    include: { author: true },
  });
}

export default async function HomePage() {
  const [destinations, reviews, blogPosts] = await Promise.all([
    getFeaturedDestinations(),
    getApprovedReviews(),
    getLatestBlogPosts(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturedDestinations destinations={destinations} />
      <ServicesSection />
      <StatsSection />
      <TestimonialsSection reviews={reviews} />
      <BlogPreview posts={blogPosts} />
      <NewsletterSection />
    </>
  );
}
