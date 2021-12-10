module.exports = [
    {
        name: '概览',
        id:'overview',
        sub:[]
    },
    {
        name:'设备管理',
        id:'devManager',
        sub:[
            {
                name:'联网设备',
                componentName:'devManager'
            }
        ]
    },
    {
        name:'数据中心',
        id:'dataCenter',
        sub:[
            {
                name:'数据统计',
                componentName: 'dataManager'
            },
            {
                name:'历史记录',
                componentName: 'historyDataView'
            }
        ]
    }

]