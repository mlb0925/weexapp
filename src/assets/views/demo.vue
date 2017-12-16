<template>
    <div class="container">
        <wxc-minibar title="懒人程序"   background-color="#F2F3F4"
                     text-color="#666"
                     @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                     @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>		 
        <wxc-indexlist v-if="network" :normal-list="list.normalList"
                       :hot-list-config="hotListConfig"
                       :city-location-config="cityLocationConfig"
                       @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                       :show-index="showIndex"></wxc-indexlist>
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
    .container {
        width: 750px;
        align-items: center;
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
    import { WxcIndexlist,WxcMinibar } from '../../../index';
    import { dataList } from './data.js';
    export default {
        components: { WxcIndexlist,WxcMinibar },
        data: () => ({
            list: dataList,
            showIndex: true,
			network:1,
            hotListConfig: {
                type: 'group',
                title: '全部',
                list: dataList.hotList
            },
            cityLocationConfig: {
                type: 'group',
                title: '推荐',
                list: [{ name: 'php教程',"url": "http://www.kuitao8.com/phpone", 'desc':''},{
                    "name": "UI",
                    "url": "http://www.kuitao8.com/webui",
                    'desc':'',
                    "pinYin": "u",
                    "py": "u"
                },
                    {
                        "name": "WEB教程",
                        "url": "http://www.kuitao8.com/tutorial",
                        'desc':'',
                        "pinYin": "w",
                        "py": "w"
                    },
                    {
                        "name": "Linux&运维",
                        "url": "http://www.kuitao8.com/linux",
                        'desc':'',
                        "pinYin": "l",
                        "py": "l"
                    },
                    {
                        "name": "linux电子书",
                        "url": "http://www.kuitao8.com/linuxbook",
                        'desc':'',
                        "pinYin": "l",
                        "py": "l"
                    },
                    {
                        "name": "mysql",
                        "url": "mysql",
                        "pinYin": "m",
                        'desc':'',
                        "py": "m"
                    },
                    {
                        "name": "mysql电子书",
                        "url": "http://www.kuitao8.com/mysqlbook",
                        "pinYin": "m",
                        'desc':'',
                        "py": "m"
                    },
                    {
                        "name": "php教程",
                        "url": "http://www.kuitao8.com/phpone",
                        'desc':'',
                        "pinYin": "p",
                        "py": "p"
                    }]
            }
        }),
        created () {
             this.checknetwork();
        },
        methods: {
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
            },
            minibarLeftButtonClick () {
            },
            minibarRightButtonClick () {
              //  modal.toast({ 'message': 'click rightButton!', 'duration': 1 });
            },
            onClick () {
                modal.toast({ message: '哎哟，网络联接异常', duration: 1 });
                this.$router.push({ path: '/demo'});
            },
            wxcIndexlistItemClicked (e) {
                var  urls = encodeURIComponent(e.item.url);
                // modal.toast({
                //   'message': urls,
                //  'duration': 1
                //})
                this.$router.push({ path: '/demo');

            }
        }
    };
</script>