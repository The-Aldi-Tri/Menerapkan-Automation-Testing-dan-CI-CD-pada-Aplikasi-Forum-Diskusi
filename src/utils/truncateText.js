const truncateText = (text, limit = 250) =>
  text.length > limit ? `${text.slice(0, limit)}...` : text;

export default truncateText;
