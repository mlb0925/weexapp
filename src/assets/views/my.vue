<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/03. -->

<template>
    <div class="wxc-demo">
        <div>
            <wxc-minibar title="关于"   background-color="#F2F3F4"
                         text-color="#666"
                         @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                         @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        </div>
        <div class="container" v-if="network">        
         <text>
             懒人程序用weex开发 这是一个DEMO版 感谢各位的支持
        </text>      
        </div>
       <div v-if="network ==0 "> 
          <div class="wxc-result">
            <image class="result-image" :src="noNetwork"></image>
            <div class="result-content">
                <text class="content-text">哎呀，没有网络了......</text>
                <text class="content-text content-desc">无网络</text>
            </div>
            <div class="result-button"
                 @click="onClick">
                <text class="button-text">刷新一下</text>
            </div>
            </div>
         </div> 
    </div>
</template>

<style scoped>
    .wxc-demo {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .container {
        flex: 1;
    }
    .demo {
        width: 750px;
        background-color: #f2f3f4;
    }
    .category {
        margin-top: 40px;
    }
    .default {
        color: #000;
    }
    .active {
        color: #FFC900;
    }
    .red {
        color: #C3413D;
    }
    .image {
        width: 80px;
        height: 80px;
        margin-right: 20px;
    }
    .demo-title {
        font-size: 30px;
        color: #333;
        margin-top: 30px;
        margin-left: 30px;
        margin-bottom: 16px;
    }
    .wrap {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .wxc-result {
        width: 750px;
        flex: 1;
        align-items: center;
        background-color: #f2f3f4;
    }

    .result-image {
        width: 320px;
        height: 320px;
    }

    .result-content {
        margin-top: 36px;
        align-items: center;
    }

    .content-text {
        font-size: 30px;
        color: #A5A5A5;
        height: 42px;
        line-height: 42px;
        text-align: center;
    }

    .content-desc {
        margin-top: 10px;
    }

    .result-button {
        margin-top: 60px;
        border-width: 1px;
        border-color: #979797;
        background-color: #FFFFFF;
        border-radius: 6px;
        width: 240px;
        height: 72px;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }

    .button-text {
        color: #666666;
        font-size: 30px;
    }
</style>

<script>
    const modal = weex.requireModule('modal');
    var navigator = weex.requireModule('navigator')
    import { WxcCell,WxcMinibar} from '../../../index';
    import Title from './_mods/title.vue';
    import Category from './_mods/category.vue';
    import { setTitle } from './_mods/set-nav';
    import { CART_ICON, RETURN_ICON } from './type';
    var stream = weex.requireModule('stream')
    import jwtdecode from 'jwt-simple';
    export default {
        components: { WxcCell, Title, Category,WxcMinibar },
        created () {
            setTitle('Cell')
        },
        data: () => ({
            color: '#000',
            rightButton: CART_ICON,
            leftButton: RETURN_ICON,
            cellStyle: {
                backgroundColor: '#f2f3f4'
            },
            lists: [],
            page:1,
            count:0,
            network:1
        }),
        created (){
            var me = this;
            stream.fetch({
                method: 'GET',
                type: 'text',
                url: this.webUrl+'/webservice/Api/List?catid=10&pagesize=20',
            }, function(ret) {
                if(ret.ok){
                   var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                   me.lists = test.list;
                   me.count = test.count/20;
                   console.log( me.lists);
                   me.network = 1;
                } else {
                      me.network = 0;
                     modal.toast({ 'message': '没有网络', 'duration': 1 });
                     return false;
                }
                
            })
        },
        methods: {
            minibarLeftButtonClick () {
            },
            minibarRightButtonClick () {
                modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
            },
             onClick () {
                modal.toast({ message: '哎哟，网络联接异常', duration: 1 });
                this.$router.push({ path: '/all'});
            },
            fetch (event) {
                var me = this;
                setTimeout(() => {

                    me.page += 1;
                    if(this.count>me.page){
                        var metest= this;
                        stream.fetch({
                            method: 'GET',
                            type: 'text',
                            url: this.webUrl+'/webservice/Api/List?catid=10&pagesize=20&page='+me.page,
                        }, function(ret) {
                            if(ret.ok){
                            var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                            if (Array.isArray(test.list)) {
                                for(var i = 0; i < test.list.length; i++) {
                                    metest.lists.push(test.list[i])
                                }
                             }
                                 me.network = 1;
                            } else {
                                  me.network = 0;
                            }
                        })
                    } else {
                        modal.toast({ message: '没有数据了', duration: 1 })
                    }

                }, 800)
            },
            wxcCellClicked (_url) {
                var  urls = encodeURIComponent(_url);
                // modal.toast({
                //   'message': urls,
                //  'duration': 1
                //})
                this.$router.push({ path: '/webview',query:{url:urls}});
            }
        }
    };
</script>