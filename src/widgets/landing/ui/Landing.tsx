"use client";
import React from "react";
import { LinkWithBtnStyle } from "@/shared/ui";
import { motion } from "framer-motion";
import { IoLayersOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { LuFileCheck, LuFolderKanban } from "react-icons/lu";
import SignInForm from "@/widgets/SignInForm/ui/SignInForm";
import { SimpleCarousel } from "@/shared/ui/Carousel";
import { images } from "../config/blocks";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const featureVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export function Landing() {
  return (
    <>
      <div className="flex mx-auto  flex-col bg-background text-foreground">
        <main id="maincontent" className="flex-1">
          <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 border-b border-border-subtle-1 grid-pattern">
            <div className="container px-4 md:px-6">
              <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
                <motion.div
                  className="flex flex-col justify-center space-y-4"
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none glow-text">
                      All your backlogs in one place
                    </h1>
                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                      Create custom backlogs with your own categories, fields,
                      and structure. From work projects to watchlists, it’s all
                      up to you
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <LinkWithBtnStyle href="#features">
                      Learn more
                    </LinkWithBtnStyle>
                  </div>
                </motion.div>

                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7 }}
                >
                  <SignInForm />
                </motion.div>
              </div>
            </div>
          </section>

          <section
            id="features"
            className="w-full  py-12 md:py-24 lg:py-32 bg-layer-1 border-b border-border-subtle-1"
          >
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl glow-text">
                    Tools to Organize Everything That Matters
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                    BacklogsHub gives you the flexibility to design, arrange,
                    and manage backlogs for work, hobbies, projects, and more —
                    all in one place.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <motion.div
                  className="flex flex-col items-center space-y-4 rounded-none border p-6 bg-black/40 backdrop-blur-sm border-border-subtle-1 hover:border-border-interactive feature-card transition-all duration-300"
                  variants={featureVariant}
                >
                  <div className="rounded-none">
                    <IoLayersOutline className="h-6 w-6 text-bg-brand" />
                  </div>
                  <h3 className="text-xl font-bold">Custom Backlogs</h3>
                  <p className="text-center text-muted-foreground">
                    Create backlogs with any categories and fields you need. Add
                    up to 10 categories per backlog, using different field types
                    to fit your style.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center space-y-4 rounded-none border p-6 bg-black/40 backdrop-blur-sm border-border-subtle-1 hover:border-border-interactive feature-card transition-all duration-300"
                  variants={featureVariant}
                >
                  <div className="rounded-none">
                    <LuFolderKanban className="h-6 w-6 text-bg-brand" />
                  </div>
                  <h3 className="text-xl font-bold">Organize with Folders</h3>
                  <p className="text-center text-muted-foreground">
                    Group your backlogs into folders and rearrange everything
                    with simple drag-and-drop. Stay organized the way that makes
                    sense for you.
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col items-center space-y-4 rounded-none border p-6 bg-black/40 backdrop-blur-sm border-border-subtle-1 hover:border-border-interactive feature-card transition-all duration-300"
                  variants={featureVariant}
                >
                  <div className="rounded-none">
                    <LuFileCheck className="h-6 w-6 text-bg-brand" />
                  </div>
                  <h3 className="text-xl font-bold">Reusable Templates</h3>
                  <p className="text-center text-muted-foreground">
                    Save any backlog as a template to quickly recreate it later
                    or share it with others for consistent organization.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </section>

          <section
            id="templates"
            className="w-full  py-12 md:py-24 lg:py-32 border-b border-border-subtle-1 grid-pattern"
          >
            <div className="container px-4 md:px-6">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl font-bold tracking-tight md:text-4xl glow-text">
                    Customize your backlogs exactly how you need them
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                    With BacklogsHub, you have complete control over how your
                    backlogs are structured. Create custom fields, organize
                    items your way, and save templates for future use.
                  </p>
                  <motion.ul
                    className="grid gap-4"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.li
                      className="flex items-start gap-2"
                      variants={featureVariant}
                    >
                      <div className="rounded-none">
                        <FaArrowRight className="h-4 w-4 text-bg-brand" />
                      </div>
                      <div className="text-sm">
                        Create up to 10 custom categories per backlog
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      variants={featureVariant}
                    >
                      <div className="rounded-none">
                        <FaArrowRight className="h-4 w-4 text-bg-brand" />
                      </div>
                      <div className="text-sm">
                        Add as many fields as you need with different types
                      </div>
                    </motion.li>
                    <motion.li
                      className="flex items-start gap-2"
                      variants={featureVariant}
                    >
                      <div className="rounded-none">
                        <FaArrowRight className="h-4 w-4 text-bg-brand" />
                      </div>
                      <div className="text-sm">
                        Organize with folders and custom ordering
                      </div>
                    </motion.li>
                  </motion.ul>
                </motion.div>
                <motion.div
                  className="relative h-[400px] w-full overflow-hidden"
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <SimpleCarousel images={images} />
                </motion.div>
              </div>
            </div>
          </section>

          <section className="w-full py-12 md:py-24 lg:py-32 bg-bg-brand/20  text-text-primary border-b border-border-subtle-1">
            <div className="container px-4 md:px-6">
              <motion.div
                className="flex flex-col items-center justify-center space-y-4 text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl glow-text">
                    Ready to organize your passions?
                  </h2>
                  <p className="mx-auto max-w-[700px] md:text-xl">
                    Whether it&apos;s movies, books, projects, or anything else
                    — BacklogsHub helps you track, organize, and bring your
                    ideas to life.
                  </p>
                </div>
                <div className="mx-auto w-full max-w-sm space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <LinkWithBtnStyle href="/register">
                      Get started
                    </LinkWithBtnStyle>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Landing;
