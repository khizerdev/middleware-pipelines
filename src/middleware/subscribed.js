export default function auth({to, from, store,next}){
    if(!store.getters['auth/user'].subscribed){
      return next({name: "home"})
    }
    return next()
} 

