// components/Avatar.js
export default function Avatar({ type = 'bot', name = 'Thecos', size = 40 }) {
  const style = { width: size, height: size };
  
  if (type === 'bot') {
    // Bot avatar: Thecos logo with fallback to gradient
    return (
      <div 
        style={style} 
        className="rounded-full overflow-hidden bg-gradient-to-br from-electric to-blue-400 flex items-center justify-center text-[#00121a] font-bold text-sm"
      >
        TC
      </div>
    );
  }
  
  // User avatar: initials
  const initials = (name || 'You')
    .split(' ')
    .map(n => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  
  return (
    <div 
      style={style} 
      className="rounded-full bg-electric text-[#00121a] font-bold flex items-center justify-center text-sm"
    >
      {initials}
    </div>
  );
}
