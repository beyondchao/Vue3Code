export interface useGoodsTrademark {
    msg: string,
    data: trademark
}
//定义品牌管理数据类型
interface trademark {
    list: trademarkItem[],
    totalCount: number,
    cates: cate[]
}
//定义品牌管理列表中每一项数据类型
interface trademarkItem {
    id: number,
    title: string,// 商品名称 
    category_id: number,// 分类id
    cover: string, // 商品封面
    rating: number, // 评分
    sale_count: number, // 销量
    review_count: number,   // 评论数
    min_price: number,  // 最低价格
    desc: any, // 描述
    unit: string, // 计量单位
    stock: number, // 库存
    min_stock: number, // 最小库存
    ischecked: number, // 审核状态 0-未审核 1-已审核
    status: number, // 商品状态 0-下架 1-上架
    stock_display: number,// 库存显示 0-隐藏 1-显示
    express_id: number, // 快递模板id
    sku_type: number, // 0-统一规格 1-多规格
    sku_value: skyValue, // 统一规格数据
    content: string, // 商品详情
    discounts: number, // 折扣信息
    create_time: string,    // 创建时间
    update_time: string,   // 更新时间
    ordered: number, // 订单数
    category: category, // 分类信息

}
//定义分类数据类型
interface cate {
    id: number,
    name: string,
    parentId: number,
    createTime: string,
    updateTime: string
}
//定义sku_value数据类型
interface skyValue {
    oprice: number,     // 原价
    pprice: number,     // 促销价
    cprice: number,    // 成本价
    weight: number,   // 重量
    volume: number   // 体积
}
//定义分类数据类型
interface category {
    id: number,
    name: string,
    status: number,
    create_time: string,    // 创建时间
    update_time: string,   // 更新时间
    category_id: number,    // 分类ID
    order: number   // 排序

}