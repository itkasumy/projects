const Entry = resolve => import('view/Entry/Entry').then(module => resolve(module))
const HelmatSpread = resolve => import('view/HelmatSpread/HelmatSpread').then(module => resolve(module))
const Wanted = resolve => import('view/Wanted/Wanted').then(module => resolve(module))
const GraphicMsg = resolve => import('view/GraphicMsg/GraphicMsg').then(module => resolve(module))

export default [
  {
    path: '/',
    component: Entry
  },
  {
    path: '/helmatSpread',
    component: HelmatSpread
  },
  {
    path: '/wanted',
    component: Wanted
  },
  {
    path: '/graphicMsg',
    component: GraphicMsg
  }
]
