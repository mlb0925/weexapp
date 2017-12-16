<template>
    <div class="wrapper">
        <wxc-minibar title="懒人程序" right-button="N" left-button="N"
                     background-color="#F2F3F4"
                     text-color="#333333"></wxc-minibar>          
        <scroller class="main-list">
              <div v-if="network">   
            <kx-slider :imageList="Banners" ></kx-slider>
            <wxc-tab-page ref="wxc-tab-page"
                          :tab-titles="tabTitles"
                          :tab-styles="tabStyles"
                          title-type="text"
                          :needSlider="needSlider"
                          :is-tab-view="isTabView"
                          :tab-page-height="tabPageHeight"
                          :spm-c="4307989"
                          @wxcTabPageCurrentTabSelected="wxcTabPageCurrentTabSelected">
                <list v-for="(v,index) in tabList"
                      :key="index"
                      class="item-container">
                    <cell class="border-cell"></cell>
                    <cell class="cell" v-for="(demo,key) in v"
                          :accessible="true"
                          :aria-label="demo.title"  :key="key">
                        <wxc-pan-item :ext-id="'1-' + (v) + '-' + (key)"  @wxcPanItemPan="wxcPanItemPan" >
                            <wxc-cell label=""
                                      :title="demo.title"
                                      :has-arrow="true" @wxcCellClicked="wxcCellClicked(webUrl+'/'+demo.inputtime.replace('-','').replace('-','')+'/'+demo.id+'.shtml')"
                                      spm="181.12312312.12312.d01"
                                      :has-top-border="false"  :price="demo.inputtime"></wxc-cell>
                        </wxc-pan-item>
                    </cell>
                </list>
            </wxc-tab-page>
            <div class="cell-button">
                <category title="最近更新"></category>
                <wxc-cell label=""
                          :title="num.title"
                          :has-arrow="true"
                          @wxcCellClicked="wxcCellClicked(webUrl+'/'+num.inputtime.replace('-','').replace('-','')+'/'+num.id+'.shtml')"
                          spm="181.12312312.12312.d01"
                          :has-top-border="false" v-for="num in lists" key="num.id"></wxc-cell>
            </div>
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
        </scroller>
         </div>   
    </div>
</template>
<script>
    const navigator = weex.requireModule('navigator');
    const modal = weex.requireModule('modal');
    import util from '../util';
    import Slider from '../components/Slider.vue';
    import { WxcCell,WxcMinibar,WxcTabPage,Utils,WxcPanItem} from '../../../index';
    var stream = weex.requireModule('stream');
    import jwtdecode from 'jwt-simple';
    import Config from './config';
    import Category from './_mods/category.vue';
    const storage = weex.requireModule('storage');
    export default {
        components: {
            'kx-slider': Slider,
            WxcMinibar,
            WxcTabPage,
            Utils,
            WxcCell,
            WxcPanItem,
            Category
        },
        data () {
            return {
                url0 : 'http://www.kuitao8.com',
                url:'http://www.kuitao8.com',
                title:'懒人程序',
                lists:[],
                network:1,
                mylist:[
                    {title:''},
                ],
                Banners: [
                    { title: '', src: 'http://app.kuitao8.com/images/banner/1.jpg'},
                    { title: '', src: 'http://app.kuitao8.com/images/banner/2.jpg'},
                    { title: '', src: 'http://app.kuitao8.com/images/banner/3.jpg'}
                ],
                tabTitles: Config.tabTitles,
                tabStyles: Config.tabStyles,
                tabList: [

                ],
                needSlider: true,
                demoList: [1,2,3,4,5,6,7,8,9,10],
                supportSlide: true,
                isTabView: true,
                tabPageHeight: 480,
                desc: [{
                    type: 'text',
                    value: 'rich-text',
                    theme: 'gray'
                }],
                tags: [{
                    type: 'tag',
                    value: 'rich tag text',
                    theme: 'yellow'
                }]
            }
        },
         props: {
            type: {
                type: String,
                default: 'noNetwork'
            },
            show: {
                type: Boolean,
                default: true
            },
            wrapStyle: Object,
            paddingTop: {
                type: [Number, String],
                default: 232
            },
            customSet: {
                type: Object,
                default: () => ({})
            }
        },
        computed: {
        },
        created (_e) {
            util.initIconFont();
            this.getCategory();
            this.tabPageHeight = Utils.env.getPageHeight();
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
                   me.network=1;
                } else {
                    me.network=0;
                    modal.toast({ 'message': '没有网络!', 'duration': 1 });
                    return false;
                }
            })
         //   this.tabList = [...Array(this.tabTitles.length).keys()].map(i => []);
           // Vue.set(this.tabList, 0, this.demoList);
        },
        methods: {
            onClick () {
                modal.toast({ message: '哎哟，网络联接异常', duration: 1 });
                this.$router.push({ path: '/home'});
            },
            getCategory(){
                var me = this;
                stream.fetch({
                    method: 'GET',
                    type: 'text',
                    url: this.webUrl+'/webservice/Api/getCategoryArticle?catid=9&pagesize=10',
                }, function(ret) {
                    if(ret.ok){
                         me.network=1;
                        var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                        me.tabList = test.list;
                    } else {
                         me.network=0;
                         modal.toast({ 'message': '没有网络!', 'duration': 1 });
                         return false;
                    }
                    
                });
                var metest = this;
                var mylist = new Array();
                stream.fetch({
                    method: 'GET',
                    type: 'text',
                    url: this.webUrl+'/webservice/Api/getCategory?catid=9',
                }, function(ret) {
                    if(ret.ok){
                         metest.network=1;
                    var  test = jwtdecode.decode(ret.data, 'michahzdee2016', 'HS256');
                    if (Array.isArray(test.list)) {
                        for(var i = 0; i < test.list.length; i++) {
                            mylist[i] = [];
                            mylist[i]['title'] = test.list[i]['catname'];
                            mylist[i]['url'] = test.list[i]['catid'];
                        }
                    }
                    metest.tabTitles = mylist;
                    } else {
                         metest.network=0;
                         modal.toast({ 'message': '没有网络!', 'duration': 1 });
                         return false;
                    }
                    
                })
            },
            wxcTabPageCurrentTabSelected (e) {
                const self = this;
                const index = e.page;
                const id = e.url;
               // modal.toast({ message: id, duration: 1 });
                /* Unloaded tab analog data request */
                if (!Utils.isNonEmptyArray(self.tabList[id])) {
                    setTimeout(() => {
                        console.log('abc');
                        console.log(self.tabList[id]);
                      Vue.set(self.tabList[id], id, self.demoList);
                    }, 100);
                }

            },
            wxcPanItemPan (e) {
                if (Utils.env.supportsEBForAndroid()) {
                  //  modal.toast({ message: _url, duration: 1 });
                //    this.$refs['wxc-tab-page'].bindExp(e.element);
                }
            },
            tabpage(e){
                modal.toast({ message: e, duration: 1 })
            },
            itemClicked (_url) {
                var  urls = encodeURIComponent(_url);
                this.$router.push({ path: '/webview',query:{url:urls}});
            },
            wxcCellClicked(_url) {
                var  urls = encodeURIComponent(_url);
                this.$router.push({ path: '/webview',query:{url:urls}});
            }
        }
    }
</script>
<style scoped>
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
    .wrapper{
    }
    .iconfont {
        font-family:iconfont;
    }
    .main-list{
        position: fixed;
        top: 91px;
        bottom: 90px;
        left: 0;
        right: 0;
        /*margin-top: 167px;*/
        /*margin-bottom: 90px;*/
    }
    .item-container {
        width: 750px;
        background-color: #f2f3f4;
    }

    .border-cell {
        background-color: #f2f3f4;
        width: 750px;
        height: 24px;
        align-items: center;
        justify-content: center;
        border-bottom-width: 1px;
        border-style: solid;
        border-color: #e0e0e0;
    }

    .cell {
        background-color: #ffffff;
    }
    .cell-button{
        padding-bottom: 18px;
    }
    .slogan{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        background-color: #fff;
    }
    .i-slg{
        height: 66px;
        font-size: 26px;
        padding-top: 16px;
        flex: 1;
        text-align: center;
        color: #b4282d;
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