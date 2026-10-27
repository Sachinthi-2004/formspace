
"use client";

import { useState } from "react";

export default function Home() {
  const [projectName, setProjectName] = useState("My Dream Home");

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#252820]">
      <nav className="flex items-center justify-between border-b border-black/10 bg-white px-6 py-5 md:px-12">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Formspace<span className="text-emerald-700">.</span>
          </h1>
          <p className="text-xs text-gray-500">
            HOME DESIGN STUDIO
          </p>
        </div>
        <a
          href="#create"
          className="rounded-full bg-[#252820] px-5 py-3 text-sm font-medium text-white hover:bg-emerald-800"
        >
          + New design
        </a>
      </nav>

      <section className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-800">
          Your vision. Your space.
        </p>

        <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
          Design a home that feels like{" "}
          <span className="font-serif italic text-emerald-800">
            yours.
          </span>
        </h2>

        <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 md:text-lg">
          Plan your dream home in 2D, explore it in 3D, and
          bring your ideas to life — one room at a time.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl bg-[#dce6dc] p-7 md:p-10">
            <div className="mb-10 flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm">
                01 / Floor planner
              </span>
              <span className="text-2xl">⌘</span>
            </div>

            <div className="grid aspect-[5/3] grid-cols-2 grid-rows-2 gap-2 rounded-xl border-4 border-[#536b56] bg-[#f8f7f1] p-2">
              <div className="flex items-center justify-center border-2 border-[#536b56] bg-[#e8e3d7] text-sm text-gray-600">
                Living room
              </div>
              <div className="flex items-center justify-center border-2 border-[#536b56] bg-[#e8e3d7] text-sm text-gray-600">
                Bedroom
              </div>
              <div className="flex items-center justify-center border-2 border-[#536b56] bg-[#e8e3d7] text-sm text-gray-600">
                Kitchen
              </div>
              <div className="flex items-center justify-center border-2 border-[#536b56] bg-[#e8e3d7] text-sm text-gray-600">
                Bathroom
              </div>
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Plan in 2D
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Start with rooms, walls and the layout of your home.
            </p>
          </div>

          <div className="rounded-3xl bg-[#e9e2d8] p-7 md:p-10">
            <div className="mb-10 flex items-center justify-between">
              <span className="rounded-full bg-white/80 px-4 py-2 text-sm">
                02 / 3D visualization
              </span>
              <span className="text-2xl">◇</span>
            </div>

            <div className="flex aspect-[5/3] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#d8d4c8] to-[#b8c5b5]">
              <div className="text-center">
                <div className="text-7xl">⌂</div>
                <p className="mt-3 text-sm font-medium text-[#465847]">
                  Your future home
                </p>
              </div>
            </div>

            <h3 className="mt-6 text-2xl font-semibold">
              Explore in 3D
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              Visualize your future space from a new perspective.
            </p>
          </div>
        </div>

        <section
          id="create"
          className="mt-8 rounded-3xl bg-white p-7 md:p-10"
        >
          <p className="text-sm font-medium text-emerald-800">
            LET'S GET STARTED
          </p>
          <h3 className="mt-3 text-2xl font-semibold">
            Start your first project
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Give your dream home a name.
          </p>

          <form
            className="mt-6 flex max-w-xl flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              alert(`Project "${projectName}" is ready to begin!`);
            }}
          >
            <input
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Enter project name"
              className="min-w-0 flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-emerald-700"
            />
            <button
              type="submit"
              className="rounded-xl bg-emerald-800 px-6 py-3 font-medium text-white hover:bg-emerald-900"
            >
              Create project →
            </button>
          </form>
        </section>
      </section>

      <footer className="border-t border-black/10 px-6 py-8 text-center text-sm text-gray-500">
        © 2026 Formspace · Design your future.
      </footer>
    </main>
  );
}
