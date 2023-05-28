const textEllipsis = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    
    const truncatedText = text.slice(0, maxLength - 3); // Subtracting 3 to account for the "..." added later
    return truncatedText + '...';
  };

  module.exports={
    textEllipsis 
  }