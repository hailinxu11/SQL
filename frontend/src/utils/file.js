export const saveFile = (function createSaveFile() {
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.style = 'display: none';
  return function save(data, fileName) {
    const blob = new Blob([data], {type: 'octet/stream'});
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
  };
}());
