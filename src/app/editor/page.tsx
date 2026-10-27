
"use client";

import { useState } from "react";

type Room = {
  id: number;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
};

const initialRooms: Room[] = [
  { id: 1, name: "Living Room", x: 30, y: 30, width: 250, height: 170, color: "#dce8d9" },
  { id: 2, name: "Bedroom", x: 280, y: 30, width: 180, height: 170, color: "#e9dfd3" },
  { id: 3, name: "Kitchen", x: 30, y: 200, width: 170, height: 130, color: "#e5e7eb" },
  { id: 4, name: "Bathroom", x: 200, y: 200, width: 120, height: 130, color: "#d9e8ee" },
];

export default function EditorPage() {
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [nextId, setNextId] = useState(5);

  const selectedRoom = rooms.find((room) => room.id === selectedId);

  function updateRoom(id: number, changes: Partial<Room>) {
    setRooms((current) =>
      current.map((room) =>
        room.id === id ? { ...room, ...changes } : room
      )
    );
  }

  function addRoom() {
    const room: Room = {
      id: nextId,
      name: `Room ${nextId - 3}`,
      x: 60 + ((nextId * 23) % 180),
      y: 60 + ((nextId * 17) % 160),
      width: 150,
      height: 120,
      color: "#e6e8dc",
    };

    setRooms((current) => [...current, room]);
    setSelectedId(room.id);
    setNextId((id) => id + 1);
  }

  function deleteRoom() {
    if (selectedId === null) return;
    setRooms((current) => current.filter((room) => room.id !== selectedId));
    setSelectedId(null);
  }

  function moveRoom(id: number, dx: number, dy: number) {
    const room = rooms.find((item) => item.id === id);
    if (!room) return;

    updateRoom(id, {
      x: Math.max(0, Math.min(600 - room.width, room.x + dx)),
      y: Math.max(0, Math.min(400 - room.height, room.y + dy)),
    });
  }

  return (
    <main className="min-h-screen bg-[#f5f4f0] text-[#252820]">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b bg-white px-5 py-4 md:px-8">
        <div>
          <a href="/" className="text-xl font-bold">
            Formspace<span className="text-emerald-700">.</span>
          </a>
          <p className="text-xs text-gray-500">2D FLOOR PLAN EDITOR</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={addRoom}
            className="rounded-xl bg-emerald-800 px-4 py-2 text-sm font-medium text-white"
          >
            + Add room
          </button>
          <a
            href="/"
            className="rounded-xl border px-4 py-2 text-sm"
          >
            Home
          </a>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-5 p-4 md:grid-cols-[1fr_260px] md:p-8">
        <section className="min-w-0">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold">My floor plan</h1>
              <p className="text-sm text-gray-500">
                Select a room to edit its properties.
              </p>
            </div>
            <span className="rounded-full bg-white px-3 py-2 text-xs text-gray-600">
              {rooms.length} rooms
            </span>
          </div>

          <div className="overflow-auto rounded-2xl border bg-white p-3 shadow-sm">
            <div
              className="relative mx-auto"
              style={{
                width: 600,
                height: 400,
                backgroundColor: "#fbfaf6",
                backgroundImage:
                  "linear-gradient(#d9ddd5 1px, transparent 1px), linear-gradient(90deg, #d9ddd5 1px, transparent 1px)",
                backgroundSize: "20px 20px",
                border: "2px solid #465847",
              }}
            >
              {rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => setSelectedId(room.id)}
                  className="absolute flex cursor-pointer flex-col items-center justify-center border-2 p-2 text-center"
                  style={{
                    left: room.x,
                    top: room.y,
                    width: room.width,
                    height: room.height,
                    backgroundColor: room.color,
                    borderColor:
                      selectedId === room.id ? "#047857" : "#667765",
                    boxShadow:
                      selectedId === room.id
                        ? "0 0 0 2px #a7f3d0"
                        : "none",
                    zIndex: selectedId === room.id ? 2 : 1,
                  }}
                >
                  <span className="text-sm font-semibold">{room.name}</span>
                  <span className="mt-1 text-xs text-gray-600">
                    {room.width / 10} × {room.height / 10} m
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs leading-5 text-gray-500">
            Prototype scale: 10 grid pixels represent approximately 1 metre.
            Use the move controls to reposition rooms.
          </p>
        </section>

        <aside className="h-fit rounded-2xl border bg-white p-5">
          <h2 className="text-lg font-semibold">Room properties</h2>

          {selectedRoom ? (
            <div className="mt-4 space-y-4">
              <label className="block text-sm">
                Room name
                <input
                  value={selectedRoom.name}
                  onChange={(event) =>
                    updateRoom(selectedRoom.id, { name: event.target.value })
                  }
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                Width (metres)
                <input
                  type="number"
                  min="5"
                  max="40"
                  value={selectedRoom.width / 10}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (Number.isFinite(value) && value >= 5 && value <= 40) {
                      updateRoom(selectedRoom.id, {
                        width: value * 10,
                        x: Math.min(selectedRoom.x, 600 - value * 10),
                      });
                    }
                  }}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>

              <label className="block text-sm">
                Height (metres)
                <input
                  type="number"
                  min="5"
                  max="30"
                  value={selectedRoom.height / 10}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    if (Number.isFinite(value) && value >= 5 && value <= 30) {
                      updateRoom(selectedRoom.id, {
                        height: value * 10,
                        y: Math.min(selectedRoom.y, 400 - value * 10),
                      });
                    }
                  }}
                  className="mt-1 w-full rounded-lg border px-3 py-2"
                />
              </label>

              <div className="rounded-xl bg-gray-50 p-3">
                <p className="text-sm text-gray-500">Approximate floor area</p>
                <p className="text-xl font-semibold">
                  {((selectedRoom.width / 10) * (selectedRoom.height / 10)).toFixed(1)} m²
                </p>
              </div>

              <p className="text-sm font-medium">Move room</p>
              <div className="grid grid-cols-3 gap-2">
                <span />
                <button
                  onClick={() => moveRoom(selectedRoom.id, 0, -20)}
                  className="rounded-lg border py-2"
                  aria-label="Move up"
                >
                  ↑
                </button>
                <span />
                <button
                  onClick={() => moveRoom(selectedRoom.id, -20, 0)}
                  className="rounded-lg border py-2"
                  aria-label="Move left"
                >
                  ←
                </button>
                <button
                  onClick={() => moveRoom(selectedRoom.id, 0, 20)}
                  className="rounded-lg border py-2"
                  aria-label="Move down"
                >
                  ↓
                </button>
                <button
                  onClick={() => moveRoom(selectedRoom.id, 20, 0)}
                  className="rounded-lg border py-2"
                  aria-label="Move right"
                >
                  →
                </button>
              </div>

              <button
                onClick={deleteRoom}
                className="w-full rounded-xl border border-red-200 px-4 py-3 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete selected room
              </button>
            </div>
          ) : (
            <p className="mt-4 text-sm text-gray-500">
              Select a room on the plan to edit it.
            </p>
          )}
        </aside>
      </div>
    </main>
  );
}
