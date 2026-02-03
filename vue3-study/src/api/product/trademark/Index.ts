//品牌管理接口
import request from '@/utils/request';
import type { useGoodsTrademark } from './type';
// 获取品牌列表的接口
//  GET /admin/product/baseTrademark/{page}/{limit}
//  获取第1页 每页10条记录/
export const reqTradeMarkList = (
    page: number,
    params?: {
        title?: string;      // 搜索关键词
        status?: number;       // 状态筛选
        categoryId?: number;   // 分类筛选
        limit?: number;          // 每页条数
        tab: string;            // 标签筛选
    }
) => request.get<any, useGoodsTrademark>(`${API.TRADEMARK_URL}/${page}`, {
    params
});

enum API {
    //获取品牌列表的接口
    TRADEMARK_URL = '/admin/goods',
    //新增品牌的接口
    ADDTRADEMARK_URL = '/admin/product/baseTrademark/save',
    //修改品牌的接口
    UPDATETRADEMARK_URL = '/admin/product/baseTrademark/update',
    //删除品牌的接口
    DELETETRADEMARK_URL = '/admin/product/baseTrademark/remove/',
}