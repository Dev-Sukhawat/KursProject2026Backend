export default function NavButton({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-gray-100 transition text-sm cursor-pointer"
    >
      {icon}
      {label}
    </button>
  );
}
