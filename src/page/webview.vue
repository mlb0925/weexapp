<template>
    <div class="wrapper">
        <div class="toolbar">
            <div class="left">
                <text class="btnTxt iconfont"  @click="back">&#xe600;</text>
            </div>
            <text class="tlt">{{title}}</text>
            <div class="right">
                <text class="btnTxt iconfont" @click="reload">&#xe6aa;</text>
            </div>
        </div>
             <div class="webview-box">
               <web ref="wv" class="webview" :src="url" @error="error"></web>
             </div>  
    </div>
</template>
<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    import util from '../assets/util';
    var stream = weex.requireModule('stream')
    import jwtdecode from 'jwt-simple';
     const webview = weex.requireModule('webview');
    export default {
        components: {
        },
        data () {
            return {
                url0 : 'http://www.kuitao8.com',
                url:'http://www.kuitao8.com',
                title:'懒人程序',
                network:1
            }
        },
        computed: {

        },
        created (_e) {
            this.checknetwork();
            util.initIconFont();
           // this.url =  util.getUrlSearch(weex.config.bundleUrl,'url') || this.url0;
            if (this.$route && this.$route.query) {
                this.url = decodeURIComponent(this.$route.query.url);
            } else {
                this.url = decodeURIComponent("http://www.baidu.com");
            }
            if(this.$route.query.title){
                this.title = this.$route.query.title;
            }
          //  modal.toast({ 'message': this.url, 'duration': 1 });
            /*
            var me = this;
            this.url =  util.getUrlSearch(weex.config.bundleUrl,'weburl') || this.url0;
            stream.fetch({
                method: 'GET',
                type: 'text',
                url: this.webUrl+'/webservice/Api/GetTitle?url'+this.url,
            }, function(ret) {
                var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                me.title = test.list;
            })*/
            console.log('webPageURL', this.url )
        },
        methods: {
            back (event) {
                webview.goBack(this.$refs.wv)
            },
            reload (event) {
                webview.reload(this.$refs.wv)
            },
            error (event) {
                console.log('error', event)
            },
            checknetwork(){
                var me = this;
                    stream.fetch({
                        method: 'GET',
                        type: 'text',
                        url: this.webUrl+'/webservice/Api/List?catid=10&pagesize=1',
                    }, function(ret) {
                        if(ret.ok){
                            me.network = 1;
                        } else {
                            me.network = 0;  
                            modal.toast({ 'message': '没有网络', 'duration': 1 });
                            return false;
                        }
                    });
            }
        }
    }
</script>
<style scoped>
    .wrapper{
        position: absolute;
        left: 0;
        right:0;
        bottom: 0;
        top:0;
    }
    .iconfont {
        font-family:iconfont;
    }

    .toolbar{
        position: fixed;
        top: 0;
        left: 0;right: 0;
        height: 114px;
        padding-top: 44px;
        background-color: #fafafa;
        opacity: .99;
        z-index: 101;
        flex-wrap: nowrap;
        flex-direction: row;
        justify-content: space-around;
        border-bottom-width: 1px;
        border-bottom-color: #d9d9d9;
    }
    .tlt{
        flex: 1;
        font-size: 36px;
        padding-top: 10px;
        color:#333;
        text-align: center;
    }
    .left,.right{
        height: 68px;
        width: 150px;
        padding-top:10px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: center;
    }
    .left{
        justify-content: flex-start;
        padding-left: 20px;
    }
    .right{
        justify-content: flex-end;
        padding-right: 20px;
    }
    .btnTxt{
        font-size: 40px;
        width: 70px;
        color:#666;

        text-align: center;
    }
    .webview-box {
        position: absolute;
        top: 114px ;
        left: 0;
        right:0;
        bottom: 0;
    }
    .webview{
        position: absolute;
        top: 0 ;
        left: 0;
        right:0;
        bottom: 0;
    }

</style>