export const dateFmt = (str) => {
  const year = String(new Date(str).getFullYear())
  const month = String(new Date(str).getMonth() + 1).padStart(2, 0)
  const day = String(new Date(str).getDate()).padStart(2, 0)
  const hour = String(new Date(str).getHours()).padStart(2, 0)
  const minute = String(new Date(str).getMinutes()).padStart(2, 0)
  const second = String(new Date(str).getSeconds()).padStart(2, 0)
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
