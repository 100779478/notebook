const data = [
    {
        "id": 1,
        "name": "用户角色管理",
        "code": "",
        "parentId": null,
        "icon": "md-contacts"
    },
    {
        "id": 2,
        "name": "用户管理",
        "code": "UserManage",
        "parentId": 1,
        "icon": "md-contact"
    },
    {
        "id": 3,
        "name": "角色管理",
        "code": "RoleManage",
        "parentId": 1,
        "icon": "md-person"
    },
    {
        "id": 4,
        "name": "系统管理",
        "code": "",
        "parentId": null,
        "icon": "md-settings"
    },
    {
        "id": 5,
        "name": "实体账户",
        "code": "RealAccountManage",
        "parentId": 4,
        "icon": "md-body"
    },
    {
        "id": 6,
        "name": "分账户管理",
        "code": "SubAccountManage",
        "parentId": 4,
        "icon": "ios-people"
    },
    {
        "id": 7,
        "name": "环境管理",
        "code": "EnvironmentManage",
        "parentId": 4,
        "icon": "md-globe"
    },
    {
        "id": 8,
        "name": "系统监控",
        "code": "",
        "parentId": null,
        "icon": "md-laptop"
    },
    {
        "id": 9,
        "name": "连接状态",
        "code": "ChannelStatusManage",
        "parentId": 8,
        "icon": "md-wifi"
    },
    {
        "id": 10,
        "name": "报表查询",
        "code": "",
        "parentId": null,
        "icon": "md-list-box"
    },
    {
        "id": 11,
        "name": "订单",
        "code": "Order",
        "parentId": 10,
        "icon": "md-apps"
    },
    {
        "id": 12,
        "name": "成交",
        "code": "Trade",
        "parentId": 10,
        "icon": "md-apps"
    },
    {
        "id": 13,
        "name": "持仓",
        "code": "Position",
        "parentId": 10,
        "icon": "md-apps"
    },
    {
        "id": 14,
        "name": "交易数据权限管理",
        "code": "TradeDataPermission",
        "parentId": 4,
        "icon": "md-analytics"
    },
    {
        "id": 15,
        "name": "策略管理",
        "code": "RuleManage",
        "parentId": 4,
        "icon": "md-folder"
    },
    {
        "id": 17,
        "name": "操作日志",
        "code": "OperatingLog",
        "parentId": 8,
        "icon": "md-paper"
    },
    {
        "id": 18,
        "name": "交易日历",
        "code": "TradeCalendar",
        "parentId": 4,
        "icon": "md-calendar"
    },
    {
        "id": 28,
        "name": "策略审批",
        "code": "RuleVetting",
        "parentId": 4,
        "icon": "md-archive"
    },
    {
        "id": 29,
        "name": "我的策略申请",
        "code": "MyRuleVetting",
        "parentId": 4,
        "icon": "md-arrow-dropright-circle"
    },
    {
        "id": 30,
        "name": "双边订单",
        "code": "BilateralOrder",
        "parentId": 10,
        "icon": "md-apps"
    },
    {
        "id": 31,
        "name": "做市义务监控统计",
        "code": "MakeMarket",
        "parentId": 8,
        "icon": "md-apps"
    },
    {
        "id": 32,
        "name": "做市义务监控历史",
        "code": "MakeMarketList",
        "parentId": 8,
        "icon": "md-apps"
    }
]

function buildTree(arr) {
    // 树形数据列表
    const tree = []
    const map = new Map()
    arr.forEach(i => {
        // 创建子杰点
        const node = {
            ...i,
            children: []
        }
        // 添加所有数据到Map
        map.set(i.id, node)
        // 如果没有parentId则为父节点,添加到树形列表
        if (!i.parentId) {
            tree.push(node)
        } else {
            // 查找子杰点对应的父节点
            const parentNode = map.get(i.parentId)
            // 有父节点,则添加到父节点的children中
            if (parentNode) {
                parentNode.children.push(node)
            }
        }
    })
    // console.log(tree)
    return tree
}

console.time('a')
buildTree(data)
console.timeEnd('a')


// 递归实现
const list = [
    {'id': 'a2', 'label': '1', 'pid': 'a1'},
    {'id': 'a3', 'label': '2', 'pid': 'a17'},
    {'id': 'a4', 'label': '4', 'pid': 'a3'},
    {'id': 'a1', 'label': '3', 'pid': 'root'},
    {'id': 'ax', 'label': '6', 'pid': 'a5'},
    {'id': 'a5', 'label': '5', 'pid': 'a4'},
    {'id': 'a6', 'label': '8', 'pid': 'a4'},
    {'id': 'ay', 'label': '7', 'pid': 'a5'},
    {'id': 'a7', 'label': '9', 'pid': 'a6'},
    {'id': 'a10', 'label': '11', 'pid': 'a9'},
    {'id': 'ag', 'label': '10', 'pid': 'a7'},
    {'id': 'a12', 'label': '13', 'pid': 'a10'},
    {'id': 'a11', 'label': '12', 'pid': 'a10'},
    {'id': 'a14', 'label': '15', 'pid': 'a11'},
    {'id': 'a13', 'label': '14', 'pid': 'a10'},
    {'id': 'a15', 'label': '16', 'pid': 'a12'},
    {'id': 'a17', 'label': '18', 'pid': 'a2'},
    {'id': 'a16', 'label': '17', 'pid': 'a13'},
];

function buildTree(node, list) {
    const children = list.filter(item => item.pid === node.id);
    console.log(children, 11)
    console.log(node)
    node.children = children.map(item => buildTree(item, list));
    return node;
}

const tree = buildTree({'id': 'root', name: 'root', pid: null}, list);
console.log(tree);