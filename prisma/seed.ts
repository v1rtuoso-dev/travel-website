import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || "file:./dev.db" });
const prisma = new PrismaClient({ adapter } as any);

async function main() {
    // Seed Users
    const admin = await prisma.user.create({
        data: {
            name: "Admin Dynamic Travel",
            email: "admin@dynamictravel.vn",
            role: "ADMIN",
            image: "/team/admin.jpg",
        },
    });

    const customer = await prisma.user.create({
        data: {
            name: "Nguyễn Văn An",
            email: "an.nguyen@email.com",
            role: "CUSTOMER",
        },
    });

    // Seed Destinations
    const destinations = await Promise.all([
        prisma.destination.create({
            data: {
                name: "Vịnh Hạ Long",
                country: "Việt Nam",
                continent: "Châu Á",
                description:
                    "Di sản thiên nhiên thế giới UNESCO với hàng nghìn đảo đá vôi hùng vĩ. Trải nghiệm du thuyền sang trọng, chèo kayak khám phá hang động và tận hưởng vẻ đẹp kỳ vĩ của thiên nhiên.",
                imageUrl: "/destinations/halong.jpg",
                price: 4500000,
                rating: 4.9,
                category: "Biển đảo",
                featured: true,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Phố cổ Hội An",
                country: "Việt Nam",
                continent: "Châu Á",
                description:
                    "Thành phố cổ kính với những ngôi nhà phố cổ, đèn lồng rực rỡ và ẩm thực đường phố tuyệt vời. Nơi giao thoa văn hóa Việt - Hoa - Nhật đầy quyến rũ.",
                imageUrl: "/destinations/hoian.jpg",
                price: 3200000,
                rating: 4.8,
                category: "Văn hóa",
                featured: true,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Sapa",
                country: "Việt Nam",
                continent: "Châu Á",
                description:
                    "Thị trấn sương mù trên núi với ruộng bậc thang tuyệt đẹp, văn hóa dân tộc độc đáo. Chinh phục đỉnh Fansipan - nóc nhà Đông Dương.",
                imageUrl: "/destinations/sapa.jpg",
                price: 3800000,
                rating: 4.7,
                category: "Núi",
                featured: true,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Đà Lạt",
                country: "Việt Nam",
                continent: "Châu Á",
                description:
                    "Thành phố ngàn hoa với khí hậu mát mẻ quanh năm, kiến trúc Pháp cổ điển và những đồi thông xanh bất tận. Thiên đường nghỉ dưỡng lý tưởng.",
                imageUrl: "/destinations/dalat.jpg",
                price: 2800000,
                rating: 4.6,
                category: "Núi",
                featured: false,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Phú Quốc",
                country: "Việt Nam",
                continent: "Châu Á",
                description:
                    "Đảo ngọc với bãi biển cát trắng, nước biển trong xanh và hệ sinh thái biển phong phú. Resort cao cấp, công viên giải trí và ẩm thực hải sản tươi ngon.",
                imageUrl: "/destinations/phuquoc.jpg",
                price: 5200000,
                rating: 4.8,
                category: "Biển đảo",
                featured: true,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Tokyo",
                country: "Nhật Bản",
                continent: "Châu Á",
                description:
                    "Thủ đô sôi động của Nhật Bản - sự kết hợp hoàn hảo giữa truyền thống và hiện đại. Từ đền Senso-ji cổ kính đến khu Shibuya náo nhiệt.",
                imageUrl: "/destinations/tokyo.jpg",
                price: 18500000,
                rating: 4.9,
                category: "Thành phố",
                featured: true,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Bali",
                country: "Indonesia",
                continent: "Châu Á",
                description:
                    "Hòn đảo thiên đường với đền đài linh thiêng, ruộng bậc thang xanh mướt và bãi biển hoàng hôn tuyệt đẹp. Trải nghiệm yoga, spa và văn hóa Hindu độc đáo.",
                imageUrl: "/destinations/bali.jpg",
                price: 12000000,
                rating: 4.7,
                category: "Biển đảo",
                featured: false,
            },
        }),
        prisma.destination.create({
            data: {
                name: "Paris",
                country: "Pháp",
                continent: "Châu Âu",
                description:
                    "Kinh đô ánh sáng với tháp Eiffel, bảo tàng Louvre và những con phố lãng mạn. Thiên đường của nghệ thuật, thời trang và ẩm thực Pháp tinh tế.",
                imageUrl: "/destinations/paris.jpg",
                price: 35000000,
                rating: 4.9,
                category: "Thành phố",
                featured: true,
            },
        }),
    ]);

    // Seed Blog Posts
    await Promise.all([
        prisma.blogPost.create({
            data: {
                title: "Top 10 Điểm Đến Không Thể Bỏ Lỡ Tại Việt Nam",
                slug: "top-10-diem-den-viet-nam",
                excerpt:
                    "Khám phá những điểm đến tuyệt vời nhất tại Việt Nam, từ vịnh Hạ Long hùng vĩ đến phố cổ Hội An quyến rũ.",
                content:
                    "Việt Nam là một trong những điểm đến hấp dẫn nhất Đông Nam Á với vẻ đẹp thiên nhiên đa dạng, văn hóa phong phú và ẩm thực tuyệt vời. Dưới đây là 10 điểm đến bạn không thể bỏ lỡ khi đến Việt Nam...",
                imageUrl: "/blog/vietnam-top10.jpg",
                authorId: admin.id,
            },
        }),
        prisma.blogPost.create({
            data: {
                title: "Hướng Dẫn Du Lịch Nhật Bản Mùa Hoa Anh Đào",
                slug: "du-lich-nhat-ban-hoa-anh-dao",
                excerpt:
                    "Mọi điều bạn cần biết để lên kế hoạch cho chuyến đi ngắm hoa anh đào tại Nhật Bản - thời điểm, địa điểm và chi phí.",
                content:
                    "Mùa hoa anh đào (Sakura) là thời điểm đẹp nhất để ghé thăm Nhật Bản. Thường diễn ra từ cuối tháng 3 đến giữa tháng 4, những cánh hoa anh đào nở rộ tạo nên khung cảnh lãng mạn tuyệt vời...",
                imageUrl: "/blog/japan-sakura.jpg",
                authorId: admin.id,
            },
        }),
        prisma.blogPost.create({
            data: {
                title: "Bí Quyết Tiết Kiệm Chi Phí Khi Du Lịch Châu Âu",
                slug: "tiet-kiem-chi-phi-du-lich-chau-au",
                excerpt:
                    "Chia sẻ kinh nghiệm và mẹo hay giúp bạn tận hưởng chuyến du lịch Châu Âu mà không lo về ngân sách.",
                content:
                    "Du lịch Châu Âu không nhất thiết phải tốn kém. Với những mẹo tiết kiệm thông minh, bạn hoàn toàn có thể khám phá những thành phố tuyệt vời của Châu Âu mà không cần chi quá nhiều...",
                imageUrl: "/blog/europe-budget.jpg",
                authorId: admin.id,
            },
        }),
    ]);

    // Seed Reviews
    await Promise.all([
        prisma.review.create({
            data: {
                userId: customer.id,
                destinationId: destinations[0].id, // Hạ Long
                rating: 5,
                comment:
                    "Chuyến đi tuyệt vời! Du thuyền sang trọng, phong cảnh đẹp ngoài sức tưởng tượng. Dynamic Travel tổ chức rất chuyên nghiệp.",
                isApproved: true,
            },
        }),
        prisma.review.create({
            data: {
                userId: customer.id,
                destinationId: destinations[1].id, // Hội An
                rating: 5,
                comment:
                    "Hội An quá đẹp! Đèn lồng lung linh buổi tối, ẩm thực đường phố ngon tuyệt. Rất hài lòng với dịch vụ của Dynamic Travel.",
                isApproved: true,
            },
        }),
        prisma.review.create({
            data: {
                userId: customer.id,
                destinationId: destinations[4].id, // Phú Quốc
                rating: 4,
                comment:
                    "Phú Quốc đẹp lắm, biển trong vắt. Chỉ tiếc là thời gian hơi ngắn. Lần sau sẽ đặt tour dài hơn với Dynamic Travel!",
                isApproved: true,
            },
        }),
    ]);

    // Seed Newsletter
    await prisma.newsletter.create({
        data: {
            email: "subscriber@example.com",
        },
    });

    console.log("✅ Seed data created successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
