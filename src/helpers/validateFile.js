export default function validateFile(filesize, filetype) {
  const BYTES_IN_MB = 1048576;
  const types = ['bmp', 'gif', 'jpg', 'jpeg', 'png'];

  const validType = types.find((type) => filetype.includes(type));

  if (filesize > BYTES_IN_MB * 10) {
    return 'Превышен максимальный размер файла';
  } else if (!validType) {
    return 'Неверный формат файла';
  } else {
    return '';
  }
}
