export default function(to, from, next){
    if(true){
      return next({name: "login"})
    }
    next()
}