// module "my-module.js"
export default function() {
    let d = new Date()
    let h = d.getHours()
    let m = d.getMinutes()
    let s = d.getSeconds()
    
    
    return {
        hour: h,
        min : m,
        second : s
    }
  }