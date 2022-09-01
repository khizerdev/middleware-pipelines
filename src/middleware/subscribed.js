export default function auth({to, from, next}){
    if(true){
      return next({name: "home"})
    }
    next()
} 

