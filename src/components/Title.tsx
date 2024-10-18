const Title = () => {
    const colors = [
      'from-blue-500 to-cyan-500', // First title gradient
      'from-red-500 to-yellow-600', // Second title gradient
      'from-pink-500 to-violet-400' // Third title gradient
    ];
  
    return (
      <div className="flex flex-col items-center mt-2 sm:mt-4 space-y-1 sm:space-y-2">
        {['Μουσική', 'για ολα', 'τα γούστα.'].map((text, index) => (
          <h1 key={index} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            <span className={`bg-gradient-to-br ${colors[index]} bg-clip-text text-transparent drop-shadow-md`}>
              {text}
            </span>
          </h1>
        ))}
      </div>
    );
  };
  
  export default Title;