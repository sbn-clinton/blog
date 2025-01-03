import { getCatPosts } from "@/action/post";
import HeroPage from "@/components/Hero";
import PostCard from "@/components/PostCard";
import prisma from "@/lib/db";

const TechnologyPage = async () => {
  const posts = await prisma.posts.findMany({
    where: {
      catName: "Technology",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      title: true,
      id: true,
      content: true,
      slug: true,
      catName: true,
      createdAt: true,
      links: true,
      authorEmail: true,
      publicId: true,
      imageUrl: true,
    },
  });

  const heroPost = await getCatPosts("Technology");
  return (
    <div className=" flex flex-col gap-5 md:gap-10 max-w-5xl md:mx-auto px-5">
      <h1 className="font-bold md:text-xl text-center">Technology Post</h1>
      <HeroPage heroPost={heroPost} />
      <div className="flex flex-col gap-4 md:gap-7">
        {posts ? (
          posts.map((post) => (
            <PostCard
              key={post.slug}
              id={post.id}
              title={post.title}
              content={post.content}
              slug={post.slug}
              catName={post.catName || ""}
              createdAt={new Date(post.createdAt).toLocaleDateString()} // Format as string
              links={post.links}
              authorEmail={post.authorEmail}
              imageUrl={post.imageUrl || ""}
              publicId={post.publicId || ""}
            />
          ))
        ) : (
          <p>No Posts in this category</p>
        )}
      </div>
    </div>
  );
};

export default TechnologyPage;
