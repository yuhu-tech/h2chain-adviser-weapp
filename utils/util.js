const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatNumberTime = n => {
  n = n.toString()
  if (Number(n) > 24) {
    n = Number(n) - 24
  }
  return n[1] ? n : '0' + n
}

const formatItemOrigin = item => {
  let temp = new Date(item.originorder.datetime * 1000)
  let tempHour = temp.getHours()
  let tempMinutes = formatNumber(temp.getMinutes())
  let tempTime = `${formatNumber(tempHour)}:${tempMinutes}~${formatNumberTime(tempHour + item.originorder.duration)}:${tempMinutes}`
  item.originorder.date = `${formatTime(temp).slice(0, 10)}`
  item.originorder.time = tempTime
  return item
}

const formatItemModify = item => {
  let temp = new Date(item.modifiedorder[0].changeddatetime * 1000)
  let tempHour = temp.getHours()
  let tempMinutes = formatNumber(temp.getMinutes())
  let tempTime = `${formatNumber(tempHour)}:${tempMinutes}~${formatNumberTime(tempHour + item.modifiedorder[0].changedduration)}:${tempMinutes}`
  item.modifiedorder[0].date = `${formatTime(temp).slice(0, 10)}`
  item.modifiedorder[0].time = tempTime
  return item
}

module.exports = {
  formatTime,
  formatNumber,
  formatItemOrigin,
  formatItemModify
}