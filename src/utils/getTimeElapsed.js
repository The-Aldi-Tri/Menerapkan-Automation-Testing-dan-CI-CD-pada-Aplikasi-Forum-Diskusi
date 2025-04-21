const getTimeElapsed = (timestamp) => {
  const now = new Date();
  const past = new Date(timestamp);

  if (Number.isNaN(past.getTime)) {
    return "Waktu tidak diketahui";
  }

  const seconds = Math.floor((now - past) / 1000);
  if (seconds < 60) {
    return `${seconds} detik lalu`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes} menit lalu`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours} jam lalu`;
  }

  const days = Math.floor(hours / 24);
  if (days < 30) {
    return `${days} hari lalu`;
  }

  const months = Math.floor(days / 30);
  if (months < 12) {
    return `${months} bulan lalu`;
  }

  const years = Math.floor(months / 12);
  return `${years} tahun lalu`;
};

export default getTimeElapsed;
