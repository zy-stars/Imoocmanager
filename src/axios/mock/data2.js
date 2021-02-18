import Mock from "mockjs";

Mock.setup({timeout:2000});

    Mock.mock('/data2','get',{
            "code":0,
            "msg": '',
            // 属性 list 的值是一个数组，其中含有 1 到 3 个元素
            'result': {
                'list|5':[{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'id|+1': 1,
                    // 属性 userId 是一个5位的随机码
                    'userName': '@cname',
                    // 属性 sex 是一个bool值
                    "sex|1-2": 1,
                    'age|10-40': 20,
                    "state|1-5": 1,
                    "interest|1-5": 1,
                     birthday:'2000-1-2',
                     address:'北京市海淀区',
                     time:'09:00'
                }] ,
                page:1,
                page_size:10,
                total:100
            },
           
        }
    )
