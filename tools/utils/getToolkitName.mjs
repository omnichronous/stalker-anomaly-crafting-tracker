export default function getToolkitName (id) {
  return {
    1: 'itm_basickit',
    2: 'itm_advancedkit',
    3: 'itm_expertkit',
    4: 'itm_drugkit',
    5: 'itm_ammokit',
  }[id]
}
