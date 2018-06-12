<template>
  <div>
    <el-main>
      <el-container>
        <el-main>
          <div>
            <h2>各区域人数</h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate asperiores cum aliquid repudiandae molestiae necessitatibus, error neque aperiam, totam qui corporis. Odit amet consectetur optio, pariatur vitae corrupti saepe nesciunt, rerum suscipit quod voluptatem ipsam! Nihil harum porro, eos ratione, est tempore sint eveniet animi vero quo dolor! Ex, velit sunt! In delectus nobis, quaerat facere blanditiis iusto distinctio excepturi, architecto temporibus itaque nisi vitae nesciunt cumque, aspernatur fugiat deserunt? Ipsum, quae ipsa debitis, beatae vero soluta exercitationem architecto libero aperiam quibusdam ab! Voluptatum tenetur cumque, nam maxime omnis corrupti neque eos odit, esse totam quaerat ducimus voluptatibus vero officia quasi exercitationem? Cumque aut qui, magnam dolore maiores laborum blanditiis voluptates quos doloremque reprehenderit aspernatur praesentium rerum libero mollitia consequatur voluptate repellat fuga earum. Voluptatum rerum, iusto fuga debitis culpa nam dicta eum incidunt. Nam ipsa voluptatem ipsam laboriosam labore enim nostrum possimus earum facilis? Nesciunt quae quis quibusdam rem laborum assumenda veritatis dolor repellat magni sed ad et corporis dolorum corrupti provident, ipsum impedit inventore tempore est, amet nisi! Amet, voluptates doloribus! Molestias dolores tempora repellat delectus accusamus qui maxime ipsa ratione excepturi eveniet nisi quisquam, natus incidunt. Dicta unde nostrum inventore architecto fuga, ipsa sed, eum reiciendis alias repellat quos a veritatis obcaecati ad beatae optio consequatur illum fugiat adipisci assumenda, maxime modi? Soluta iste dolore ullam? Quisquam laborum fugiat ab eaque numquam ipsam esse necessitatibus? Nostrum facilis veritatis nulla deleniti a veniam assumenda incidunt, velit fugit ratione. Consequuntur ab quod ducimus sapiente, cumque voluptates recusandae asperiores at, excepturi quas tempore sint vitae quos porro aspernatur reprehenderit, blanditiis sequi enim fuga laborum adipisci ullam ad eum omnis! Labore cum illo laborum nulla ut tenetur inventore et maxime itaque fugit ea amet necessitatib
          </div>
          <div ref="demo" style="width: 600px; height: 400px;"></div>
        </el-main>
        <el-aside width="40%">
          <div class="totalAmount">
            <h4>区域总人数</h4>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Unde natus, neque doloremque suscipit beatae ipsum animi consequatur repellendus voluptatibus, minima pariatur eos nemo aut nam ipsam mollitia inventore harum, quia minus voluptate quidem cupiditate optio explicabo? Molestias minus blanditiis officia commodi, deleniti quia expedita veniam reiciendis magnam odit sit? Ab accusamus nobis ullam sint! Commodi fugit repellat ex delectus molestias nemo tempora eius aperiam! Quam eos ut provident accusantium praesentium recusandae perferendis maiores qui fugit, nihil a ipsum sint nulla.
          </div>
          <div>
            <div ref="change" style="width: 480px; height: 300px;"></div>
          </div>
          <div>
            <h4>当日所有区域人数变化</h4>
            <div ref="allAreaChange" style="width: 480px; height: 300px;"></div>
          </div>
        </el-aside>
      </el-container>
    </el-main>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    data() {
      return {
        qiaKou: {
          color: ['#4cabce', '#e5323e'],
          title: {
            text: '卡口人流数统计'
          },
          legend: {
            right: 60,
            data: ['进', '出']
          },
          xAxis: {
            type: 'category',
            data: ['卡口1', '卡口2']
          },
          yAxis: {
            type: 'value',
            name: '人数'
          },
          series: [
            {
              name: '进',
              barGap: 0,
              data: [120, 200],
              type: 'bar'
            },
            {
              name: '出',
              data: [120, 110],
              type: 'bar'
            }
          ]
        },
        areaTrendAsTime: {
          title: {
            text: '区域人数随时间变化'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            name: '时间（24小时）',
            nameLocation: 'middle',
            boundaryGap: false
          },
          yAxis: {
            name: '人数',
            type: 'value'
          },
          series: [
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        },
        allAreasTrend: {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    },
    methods: {
      test () {
        echarts.init(this.$refs.demo).setOption(this.qiaKou)
        echarts.init(this.$refs.change).setOption(this.areaTrendAsTime)
        echarts.init(this.$refs.allAreaChange).setOption(this.allAreasTrend)
      }
    },
    created () {},
    mounted () {
      this.test()
    }
  }
</script>

<style lang="scss" scoped>
.el-main {
  color: #333;
  padding: 10px;
  .el-main {
    margin: 0;
    padding: 0;
  }
  .el-aside {
    margin-left: 10px;
  }
} 
</style>
