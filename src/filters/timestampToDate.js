export default function (timestamp) {
  const datetime = new Date(timestamp * 1000);
  const year = datetime.getFullYear();
  const month = datetime.getMonth() + 1;
  const date = datetime.getDate();
  const hour = datetime.getHours();
  const minute = datetime.getMinutes();
  const second = datetime.getSeconds();

  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second;
}
