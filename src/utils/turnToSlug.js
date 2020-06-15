export default (string) => {
  if(typeof string !== 'string') return ''
  return string.toLowerCase().split(' ').join('_')
}