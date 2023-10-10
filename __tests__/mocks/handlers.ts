import { rest } from 'msw'

import data from './data'

export const handlers = [
  rest.get('https://api.rawg.io/api/games', (_,res,ctx) =>{
    return res(ctx.json(data))
  }),

]