function getDistance(p1,p2){
    return (p1.lat - p2.lat)*(p1.lat - p2.lat) + (p1.lng - p2.lng)*(p1.lng - p2.lng);
}
Array.prototype.remove = function (r) {
    var index = this.indexOf(r);
    if(index > -1){
        this.splice(index,1);
    }
}

function pointCluster(points){
    let clus = [];
    if(points.length > 0){
        points.forEach(p => {
            if(clus.length == 0){
                let c1 = [];
                p.distance = 0;
                c1.push(p);
                clus.push(c1);
            }else{
                let isPut = false;
                clus.forEach(c => {
                    if(!isPut){
                        let di = getDistance(p,c[0]);
                        if(di < 20*20){
                            p.distance = di;
                            c.push(p)
                            isPut = true;
                        }
                    }
                })
                if(!isPut){
                  let c2 = [];
                  p.distance = 0;
                  c2.push(p);
                  clus.forEach(c => {
                    c.forEach(ci => {
                          let di = getDistance(p,ci);
                          if(di < ci.distance){
                              ci.distance = di;
                              c2.push(ci);
                              c.remove(ci);
                          }
                    })
                  })
                  clus.push(c2);
                }
            }
        })
        return clus;
    }
}
//vue（传入this) 
function imgClusterer(vue) {
    //从后端获取行人的坐标信息，并聚合
    const url = "/trace/personMonitor/getPersonTrace?typeStr=3";
    vue.$axios.get(url).then(res => {
        if (res.data.length > 0) {
            return pointCluster(res.data);
        }
    })
    .catch(function (error) {
        console.log(error)
    })
}
export { imgClusterer, pointCluster }