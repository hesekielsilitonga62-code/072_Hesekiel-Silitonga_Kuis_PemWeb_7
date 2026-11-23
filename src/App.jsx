import { useState } from "react";

const initialTodos = [
  {
    id: 1,
    title: "Nonton konser Jaehyun",
    description: "MANDI biar gk bau ketek, bawa lighstick, siapin spidol incase ketemu",
    status: "to-do",
    priority: "high",
    deadline: "2026-12-15",
  },
  {
    id: 2,
    title: "Jaehyun keluar wamil",
    description: "READY MENONTON LIVE COMEBACK WAK GENG",
    status: "in progress",
    priority: "high",
    deadline: "2026-11-30",
  },
  {
    id: 3,
    title: "Jaehyun rilis album",
    description: "NABUNGG!!!",
    status: "to-do",
    priority: "high",
    deadline: "2026-12-05",
  },
];

// Fungsi pembantu agar huruf pertama selalu kapital
const capitalizeFirst = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [selectedId, setSelectedId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "to-do",
    priority: "low",
    deadline: "",
  });

  const activeTodo = todos.find((item) => item.id === selectedId);

  const handleOpenAdd = () => {
    setFormData({
      title: "",
      description: "",
      status: "to-do",
      priority: "low",
      deadline: "",
    });
    setIsAddModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) {
      alert("p, judul sama deadlinenya diisi dulu ya wak!");
      return;
    }

    const formattedTitle = capitalizeFirst(formData.title);
    const isConfirmed = window.confirm(`p, bener ini wak mau ditambah "${formattedTitle}"?`);
    if (!isConfirmed) return;

    const newTodo = {
      id: Date.now(),
      ...formData,
      title: formattedTitle,
      description: capitalizeFirst(formData.description),
    };

    setTodos([...todos, newTodo]);
    setIsAddModalOpen(false);
  };

  const handleOpenUpdate = () => {
    setFormData({
      title: activeTodo.title,
      description: activeTodo.description,
      status: activeTodo.status,
      priority: activeTodo.priority,
      deadline: activeTodo.deadline,
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.deadline) {
      alert("p, judul sama deadlinenya diisi dulu ya wak!");
      return;
    }

    const isConfirmed = window.confirm("p, bener ini wak mau diupdate?");
    if (!isConfirmed) return;

    const updatedTodos = todos.map((item) =>
      item.id === selectedId
        ? {
            ...item,
            ...formData,
            title: capitalizeFirst(formData.title),
            description: capitalizeFirst(formData.description),
          }
        : item
    );

    setTodos(updatedTodos);
    setIsUpdateModalOpen(false);
  };

  const handleDelete = (id, title) => {
    const isConfirmed = window.confirm(`p, bener ini wak mau dihapus "${capitalizeFirst(title)}"?`);
    if (isConfirmed) {
      setTodos(todos.filter((item) => item.id !== id));
    }
  };

  // =========================================================================
  // TAMPILAN 2: HALAMAN DETAIL TUGAS
  // =========================================================================
  if (selectedId && activeTodo) {
    return (
      <div className="min-h-screen bg-[#022336] text-white font-['Lato'] flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-[#042B42] border border-[#11425E] rounded-xl p-8 shadow-xl flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1">
            <h2 className="text-base font-bold text-[#F5B700] uppercase">Judul</h2>
            <p className="text-gray-100 font-normal mt-1 mb-5">
              {capitalizeFirst(activeTodo.title)}
            </p>

            <h2 className="text-base font-bold text-[#F5B700] uppercase mb-2">Deskripsi</h2>
            <div className="bg-[#022336] border border-[#11425E] rounded-lg p-3 text-gray-200 font-normal min-h-28 text-sm">
              {activeTodo.description ? capitalizeFirst(activeTodo.description) : "-"}
            </div>
          </div>

          <div className="w-full md:w-48 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-[#F5B700] uppercase">Status</h3>
                <p className="text-sm font-normal text-gray-200">
                  {capitalizeFirst(activeTodo.status)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5B700] uppercase">Prioritas</h3>
                <p className="text-sm font-normal text-gray-200">
                  {capitalizeFirst(activeTodo.priority)}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5B700] uppercase">Deadline</h3>
                <p className="text-sm font-normal text-gray-200">{activeTodo.deadline}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setSelectedId(null)}
                className="flex-1 bg-[#EF4444] hover:bg-red-600 text-white text-sm font-semibold py-2 px-3 rounded-lg cursor-pointer transition"
              >
                Kembali
              </button>
              <button
                onClick={handleOpenUpdate}
                className="flex-1 bg-[#F5B700] hover:bg-amber-400 text-[#022336] text-sm font-bold py-2 px-3 rounded-lg cursor-pointer transition"
              >
                Update
              </button>
            </div>
          </div>
        </div>

        {/* MODAL UPDATE TODO */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
            <div className="bg-[#042B42] border border-[#11425E] text-white rounded-xl w-full max-w-md p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-center text-[#F5B700] uppercase mb-4">
                Update Todo
              </h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Judul</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Deskripsi</label>
                  <textarea
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-200">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                    >
                      <option value="to-do">To-do</option>
                      <option value="in progress">In progress</option>
                      <option value="done">Done</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-1 text-gray-200">Prioritas</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Deadline</label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="bg-[#EF4444] hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer transition"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-[#F5B700] hover:bg-amber-400 text-[#022336] py-2 rounded-lg text-sm font-bold cursor-pointer transition"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // =========================================================================
  // TAMPILAN 1: HALAMAN UTAMA DAFTAR TUGAS
  // =========================================================================
  return (
    <div className="min-h-screen bg-[#022336] text-white font-['Lato'] p-8 flex items-start justify-center">
      <div className="w-full max-w-5xl bg-[#042B42] border border-[#11425E] rounded-xl p-8 shadow-xl mt-6">
        {/* Header di Tengah */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white tracking-wide uppercase">
            TUDU LIST
          </h1>
        </div>

        {/* Tabel Daftar Tugas */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#11425E] text-sm font-bold text-[#F5B700] uppercase">
                <th className="py-3 px-2 font-bold">JUDUL</th>
                <th className="py-3 px-2 font-bold">STATUS</th>
                <th className="py-3 px-2 font-bold">PRIORITAS</th>
                <th className="py-3 px-2 font-bold">DEADLINE</th>
                <th className="py-3 px-2 text-center font-bold">AKSI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#11425E] text-sm text-gray-100 font-normal">
              {todos.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-400 font-normal">
                    Belum ada tugas. Klik "Tambah Todo" untuk membuat baru.
                  </td>
                </tr>
              ) : (
                todos.map((todo) => (
                  <tr key={todo.id} className="hover:bg-[#063652] transition">
                    <td className="py-4 px-2 max-w-xs truncate font-normal">
                      {capitalizeFirst(todo.title)}
                    </td>
                    <td className="py-4 px-2 text-gray-200 font-normal">
                      {capitalizeFirst(todo.status)}
                    </td>
                    <td className="py-4 px-2 text-gray-200 font-normal">
                      {capitalizeFirst(todo.priority)}
                    </td>
                    <td className="py-4 px-2 text-gray-200 font-normal">
                      {todo.deadline}
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex justify-center gap-4">
                        <button
                          onClick={() => setSelectedId(todo.id)}
                          className="text-[#F5B700] hover:text-amber-300 hover:underline text-sm font-normal cursor-pointer transition"
                        >
                          Lihat
                        </button>
                        <button
                          onClick={() => handleDelete(todo.id, todo.title)}
                          className="text-[#EF4444] hover:text-red-300 hover:underline text-sm font-normal cursor-pointer transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Tombol Tambah Todo di Bawah Tengah */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleOpenAdd}
            className="bg-[#F5B700] hover:bg-amber-400 text-[#022336] text-sm font-bold px-6 py-2.5 rounded-lg cursor-pointer transition"
          >
            Tambah Todo
          </button>
        </div>
      </div>

      {/* MODAL TAMBAH TODO */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#042B42] border border-[#11425E] text-white rounded-xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-center text-[#F5B700] uppercase mb-4">
              Tambah Todo
            </h2>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1 text-gray-200">Judul</label>
                <input
                  type="text"
                  placeholder="Masukkan judul tugas..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-[#022336] border border-[#11425E] text-white font-normal placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-200">Deskripsi</label>
                <textarea
                  rows="3"
                  placeholder="Masukkan deskripsi..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#022336] border border-[#11425E] text-white font-normal placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                  >
                    <option value="to-do">To-do</option>
                    <option value="in progress">In progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1 text-gray-200">Prioritas</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1 text-gray-200">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-[#022336] border border-[#11425E] text-white font-normal rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#F5B700]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="bg-[#EF4444] hover:bg-red-600 text-white py-2 rounded-lg text-sm font-semibold cursor-pointer transition"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-[#F5B700] hover:bg-amber-400 text-[#022336] py-2 rounded-lg text-sm font-bold cursor-pointer transition"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}