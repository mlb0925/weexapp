<!-- CopyRight (C) 2017-2022 Alibaba Group Holding Limited. -->
<!-- Created by Tw93 on 16/11/03. -->

<template>
    <div class="wxc-demo">
        <div>
            <wxc-minibar title="懒人程序"   background-color="#F2F3F4"
                         text-color="#666"
                         @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                         @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        </div>
        <scroller class="container"  @loadmore="fetch" loadmoreoffset="10">
            <wxc-cell label=""
                          :title="num.title"
                          :has-arrow="true"
                          @wxcCellClicked="wxcCellClicked(webUrl+'/'+num.inputtime.replace('-','').replace('-','')+'/'+num.id+'.shtml')"
                          spm="181.12312312.12312.d01"
                          :has-top-border="false" v-for="num in lists" key="num.id"></wxc-cell>
        </scroller>
    </div>
</template>

<style scoped>
    .wxc-demo {
        width: 750px;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        background-color: #ffffff;
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
            count:0
        }),
        created (){
            var me = this;
            stream.fetch({
                method: 'GET',
                type: 'text',
                url: this.webUrl+'/webservice/Api/List?catid=13&pagesize=20',
            }, function(ret) {
                var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                me.lists = test.list;
                me.count = test.count/20;
                console.log( me.lists);
            })
        },
        methods: {
            minibarLeftButtonClick () {
            },
            minibarRightButtonClick () {
                modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
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
                            url: this.webUrl+'/webservice/Api/List?catid=13&pagesize=20&page='+me.page,
                        }, function(ret) {
                            var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                            if (Array.isArray(test.list)) {
                                for(var i = 0; i < test.list.length; i++) {
                                    metest.lists.push(test.list[i])
                                }
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