<template>
  <div>
      <img src="../../../static/images/right_bg.png" style="position:absolute;width:800px;height:600px;margin:10px;">
      <canvas id="canvas" style="position:absolute;margin:10px;" width="800" height="600"></canvas>
  </div>
</template>
<style>

</style>
<script>
export default {
  data(){
      return{
          testPoints:[{x:10,y:10,distance:-1},{x:20,y:10,distance:-1},{x:10,y:20,distance:-1},
          {x:50,y:50,distance:-1},{x:68,y:50,distance:-1},{x:71,y:50,distance:-1},{x:50,y:60,distance:-1}]
      }
  },
  mounted() {
    //   this.createPoints();
      let clus = this.pointCluster(this.testPoints);
      this.drawPointCluster(clus);
  },
  methods:{
      createPoints(){
          for(var i = 0; i<500; i++){
            this.testPoints.push({
                x:100+Math.random()*200,
                y:100+Math.random()*100,
                distance:-1
                });
          }
           for(var i = 0; i<500; i++){
            this.testPoints.push({
                x:50+Math.random()*200,
                y:20+Math.random()*300,
                distance:-1
                });
          }
      },
      getDistance(p1,p2){
          return (p1.x - p2.x)*(p1.x - p2.x) + (p1.y - p2.y)*(p1.y - p2.y);
      },
      pointCluster(points){
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
                          let di = this.getDistance(p,c[0]);
                          if(di < 20*20){
                              p.distance = di;
                              c.push(p)
                              isPut = true;
                          }
                      })
                      if(!isPut){
                        let c2 = [];
                        p.distance = 0;
                        c2.push(p);
                        clus.forEach(c => {
                            c.forEach((ci,index) => {
                                let di = this.getDistance(p,ci);
                                if(di < ci.distance){
                                    ci.distance = di;
                                    c2.push(ci);
                                    c.splice(index,1);
                                }
                            })
                        })
                        clus.push(c2);
                      }
                  }
              })
              return clus;
          }
      },
      drawPointCluster(clus){
          if(clus.length > 0){
              console.log(clus)
              clus.forEach(c => {
                  var canvas = document.getElementById("canvas");
                  var ctx = canvas.getContext('2d');
                  ctx.fillStyle = "#ccc";
                  ctx.font = "8px";
                //   console.log(c.length,parseInt(c[0].x),parseInt(c[0].y))
                  ctx.fillText(c.length,parseInt(c[0].x),parseInt(c[0].y));
              })
          }
      }
  }
}
</script>

