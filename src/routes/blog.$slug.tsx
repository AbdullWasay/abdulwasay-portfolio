import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Backdrop, Cursor, ScrollProgress } from "@/components/site/Atmosphere";
import { Footer } from "@/components/site/Contact";
import { Reveal } from "@/components/site/primitives";
import { posts, postBySlug, profile } from "@/data/portfolio";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    const title = post ? `${post.title} — Writing | ${profile.fullName}` : `Writing | ${profile.fullName}`;
    const description = post?.excerpt ?? "Engineering notes by Abdul Wasay.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <Backdrop />
      <Cursor />
      <ScrollProgress />

      <main className="relative z-10">
        <article className="mx-auto max-w-3xl px-6 pb-20 pt-24">
          <Reveal>
            <Link
              to="/"
              hash="blog"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-accent"
            >
              <ArrowLeft className="size-3.5" aria-hidden />
              Back to writing
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="mt-10">
            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              <span>{post.date}</span>
              <span className="size-1 rounded-full bg-accent" />
              <span>{post.read}</span>
            </div>
            <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-lg">
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mt-10 space-y-6 border-t border-border pt-10">
            {post.body.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-foreground/90 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-14 rounded-2xl border border-border bg-card/70 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">Author</p>
            <p className="mt-2 text-lg font-medium text-foreground">{profile.fullName}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.role}</p>
            <Link
              to="/"
              hash="contact"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-accent transition-colors hover:text-foreground"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" aria-hidden />
            </Link>
          </Reveal>

          {related.length > 0 ? (
            <Reveal delay={0.2} className="mt-16">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                More writing
              </h2>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <li key={item.slug}>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: item.slug }}
                      className="group block h-full rounded-2xl border border-border bg-card/60 p-5 transition-colors hover:border-accent/40"
                    >
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {item.date}
                      </p>
                      <p className="mt-2 text-base font-medium text-foreground transition-colors group-hover:text-accent">
                        {item.title}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </article>
      </main>

      <Footer />
    </div>
  );
}
