<template>
    <div class="container">
        <wxc-minibar title="懒人程序"   background-color="#F2F3F4"
                     text-color="#666"
                     @wxcMinibarLeftButtonClicked="minibarLeftButtonClick"
                     @wxcMinibarRightButtonClicked="minibarRightButtonClick"></wxc-minibar>
        <wxc-indexlist :normal-list="list.normalList"
                       :hot-list-config="hotListConfig"
                       :city-location-config="cityLocationConfig"
                       @wxcIndexlistItemClicked="wxcIndexlistItemClicked"
                       :show-index="showIndex"></wxc-indexlist>
    </div>
</template>

<style scoped>
    .container {
        width: 750px;
        align-items: center;
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

        },
        methods: {
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
                this.$router.push({ path: '/webview',query:{url: urls,title:e.item.name}});

            }
        }
    };
</script>