<template>
<div>
    <div class="msgBackImg">
        <img src="../assets/images/contract.png" class="contractImg" @click="closeCountMsg"/>
        <div>区域名称</div>
        <div class="title"><span class="title-left">&#8197;</span><span class="title-text">区域总人数</span></div>
            <div id="count-container">
                <div class="num-back" v-for="(value, index) in nums" :key="index">{{value}}</div>
                <div class="title-text">人</div>
            </div>
        <div class="divide"></div>
        <div class="title"><span class="title-left">&#8197;</span><span class="title-text">区域重点人员数</span><span class="title-text">130</span><span class="title-text">人</span></div>
        <div id="myChart"></div> 
    </div>
    
</div>
</template>
<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
export default {
    data(){
        return{
            nums:["1","3","4","5","2"]
        }
    },
    mounted() {
        this.drawPie();
    },
    props: {
        
    },
    computed: {
        
    },
    methods:{
        closeCountMsg(){
            this.$emit('closeCountMsg');
        },
        drawPie(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('myChart'))
            // 绘制图表
            myChart.setOption({
        tooltip: {
            trigger: 'item',
            formatter: function(item) {
            }
        },
        color: ['#e76d1e', '#1b64d5', '#19dbd4', '#13a436', '#ecd514'], //手动设置每个图例的颜色
        legend: {
            orient: 'horizontal',
            left: 'center',
            bottom: 0,
            data: ['30%', '10%', '15%', '20%', '25%'],
            textStyle: { //图例文字的样式
                color: '#fff', //文字颜色
                fontSize: 12 //文字大小
            }
        },
        series: [{
             type: 'pie',
            name: '人数',
            radius: ['30%', '35%'],
            itemStyle: { //图形样式
                normal: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                    label: { //饼图图形上的文本标签
                        show: true, //平常不显示
                        textStyle: {
                            fontSize: '12',
                            color: '#fff',
                        },
                        formatter: function(obj) {
                            return obj.name + ' ' + obj.value + ''
                        }
                    },
                    labelLine: { //标签的视觉引导线样式
                        show: true, //平常不显示
                        textStyle: {
                            fontSize: '14',
                            color: '#fff',
                        }
                    }
                },
                emphasis: { //normal 是图形在默认状态下的样式；emphasis 是图形在高亮状态下的样式，比如在鼠标悬浮或者图例联动高亮时。
                    label: { //饼图图形上的文本标签
                        show: true,
                        position: 'center',
                        textStyle: {
                            fontSize: '14',
                            fontWeight: 'bold'
                        },
                    }
                }
            },
            data: [
                { value: 10, name: 'A区' },
                { value: 10, name: 'B区' },
                { value: 10, name: 'C区' },
                { value: 10, name: 'D区' },
                { value: 10, name: 'E区' },
                { value: 10, name: 'F区' },
                { value: 10, name: 'G区' }
            ]
        }]
    }   
        )}
    }
};
</script>
<style scoped>

.msgBackImg{
    margin: 0.1rem;
    width: 6rem;
    height: 9.3rem;
    background-image: url(../assets/images/back.png);
    text-align: start;
    padding-left: 0.5rem;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
  }
 
#count-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin:10px;
}
.contractImg{
    position: absolute;
    width: 3rem;
    left:1.5rem;
    top:8.8rem;
    z-index: 2;
}
.title{
    margin-top: 0.3rem;
    
}
.title-left{
    height: 0.15rem;
    background-color: turquoise;
}
.title-text{
    margin-left: 0.1rem;
    font-size: 16px;
    font-weight: bold;
    color:turquoise;
    left:0;
}
.divide{
    width: 90%;
    height: 1px;
    background-color: turquoise;
}
#myChart{
    height: 6rem;
    width: 5.6rem;
}
.num-back{
    width: 0.63rem;
    height: 0.85rem;
    -moz-background-size: contain;
    -o-background-size: contain;
    background-size: contain;
    background-image: url(../assets/images/num_back.png);
    color:yellow;
    text-align: center;
    line-height: 0.85rem;
    font-size: 0.6rem;
    font-weight: bold;
}
</style>


