// ===============================面包屑公共方法===========================================
function CN_EN_router_map(routes, o) {
    if (typeof o !== 'object') {
        o = {}
    }
    for (let i = 0, len = routes.length; i < len; i++) {
        let meta = routes[i].meta;
        if (meta) {
            let name =
                routes[i].path[0] === "/" ? routes[i].path.slice(1) : routes[i].name;
            o[name] = meta.title;
            if (routes[i].children && routes[i].children) {
                CN_EN_router_map(routes[i].children, o)
            }
        }
    }
    return o
}
export {CN_EN_router_map}
// ===============================面包屑公共方法===========================================

// ===============================js实现时间过滤的公共方法=============================
    export   const dateFmt = (time) => {
        let date = new Date(time);
        let Y = date.getFullYear() + "-";
        let M = (date.getMonth() + 1 < 10? '0' + (date.getMonth() + 1):date.getMonth() + 1) + '-';
        let D = date.getDate() < 10? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        let h = date.getHours() <10?  '0' + date.getHours()+ ':': date.getHours() + ':';
        let m = date.getMinutes() < 10?  '0' + date.getMinutes() + ':': date.getMinutes() +  ':';
        let s = date.getSeconds() <10? '0' + date.getSeconds(): date.getSeconds();
        return Y + M + D + h + m + s;
    }
// ===============================js实现时间过滤的公共方法=============================













