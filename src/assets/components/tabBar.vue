<template>
    <div class="wrapper">
        <!--<div v-for="i in items">-->
            <!--<div class="bar-item" @click="tabTo(i.key)">-->
                <!--<text class="bar-ic iconfont">{{i.icon}}</text>-->
                <!--<text class="bar-txt">{{i.name}}</text>-->
            <!--</div>-->
        <!--</div>-->

        <div class="bar-item" @click="tabTo('home')">
            <text class="bar-ic iconfont" :style="testCS">&#xe65c;</text>
            <text class="bar-txt" :style="testCS">首页</text>
        </div>
        <div class="bar-item" @click="tabTo('top')">
            <text class="bar-ic iconfont" :style="testCB">&#xe608;</text>
            <text class="bar-txt" :style="testCB">推荐</text>
        </div>
        <div class="bar-item act" @click="tabTo('demo')">
            <text class="bar-ic iconfont" :style="testDemo">&#xe7f9;</text>
            <text class="bar-txt" :style="testDemo">分类</text>
        </div>
        <div class="bar-item" @click="tabTo('all')">
            <text class="bar-ic iconfont" :style="testAll">&#xe625;</text>
            <text class="bar-txt" :style="testAll">PHP教程</text>
        </div>
        <div class="bar-item" @click="tabTo('test')">
            <text class="bar-ic iconfont" :style="testTest">&#xe606;</text>
            <text class="bar-txt" :style="testTest">关于</text>
        </div>
    </div>
</template>
<style scoped>
    .iconfont {
        font-family:iconfont;
    }
    .wrapper{
        position: fixed;
        bottom: 0;
        left: 0;right: 0;
        height: 90px;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        border-top-width: 1px;
        border-top-color: #d9d9d9;
        background-color: #fafafa;
    }
    .bar-item{
        flex: 1;
    }
    .bar-txt,.bar-ic{
        color:#666;
        text-align: center;
    }
    .bar-active{
        color:#b4282d;
    }
    .bar-ic{
        padding-top: 7px;
        font-size: 38px;
    }
    .bar-txt{
        font-size: 22px;
        padding-top: 1px;
    }
</style>
<script>

    var modal = weex.requireModule('modal');
    export default {
//        props: {
//            indexKey: {
//                type: String,
//                default: 'home'
//            },
//            reClick: {
//                type: Boolean,
//                default: false
//            },
//            items: {
//                type: Array,
//                default: function(){
//                    return [
//                        {
//                            icon:'&#xe660;',
//                            name:"首页",
//                            key:'home'
//                        }
//                    ]
//                }
//            }
//        },
        computed:{
            testCS:function () {
                return this.pIndexKey == 'home'?'color:#b4282d;':''
            },
             testCB:function () {
                return this.pIndexKey == 'top'?'color:#b4282d;':''
            },
             testDemo:function () {
                return this.pIndexKey == 'demo'?'color:#b4282d;':''
            },
            testAll:function () {
                return this.pIndexKey == 'all'?'color:#b4282d;':''
            },
             testTest:function () {
                return this.pIndexKey == 'test'?'color:#b4282d;':''
            }
            
        },
        data () {
            return {
                pIndexKey:'home'
            }
        },
        mounted(){
        },
        methods: {
            tabTo(_key){
                if(this.pIndexKey == _key) return;
                this.pIndexKey = _key;
                this.$emit('tabTo',{
                    status : 'tabTo',
                    data : {
                        key : _key
                    }
                })
            }
        }
    }
</script>
