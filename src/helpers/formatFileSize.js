export default function formatFileSize(filesize) {
  const BYTES_IN_MB = 1048576;

  return (filesize / BYTES_IN_MB).toFixed(3);
}
